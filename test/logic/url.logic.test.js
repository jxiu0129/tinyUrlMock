import supertest from "supertest";

import app from "../../app/app";
import UrlLogic from "../../app/logic/url.logic";
import { connectDB } from "../../app/config";
import KGS from "../../app/services/KeyGenerate.service";
import AdminLogic from "../../app/logic/admin.logic";

const request = supertest(app);

describe("測試url邏輯層", () => {
    const OLD_ENV = process.env;
    beforeAll(async () => {
        await connectDB();
        await AdminLogic.clearAll();
        await KGS.createNewKeys();
    });
    afterAll(() => {
        jest.clearAllMocks();
        jest.resetModules();
        process.env = { ...OLD_ENV };
    });
    describe("測試createTinyUrl", () => {
        it("傳入任一網址會回傳縮短後的網址，並符合英數大小寫共六字", async () => {
            // arrange
            const url = "www.google.com";
            const shortenUrlDomain = "localhost:3000/";
            // act
            const { shortenUrl } = await UrlLogic.createTinyUrl(url);
            shortenUrl.replace(shortenUrlDomain, "");
            // assert
            expect(shortenUrl).toMatch(/[a-zA-Z0-9]{6}/);
        });

        it("傳入一樣的網址會有一樣的縮網址", async () => {
            // arrange
            const url1 = "www.1.com";
            const url2 = "www.1.com";

            // act
            const result1 = await UrlLogic.createTinyUrl(url1);
            const result2 = await UrlLogic.createTinyUrl(url2);

            // assert
            expect(result1.shortenUrl).toBe(result2.shortenUrl);
        });

        it("傳入不一樣的網址會有不一樣的縮網址", async () => {
            // arrange
            const url1 = "www.1.com";
            const url2 = "www.2.com";

            // act
            const result1 = await UrlLogic.createTinyUrl(url1);
            const result2 = await UrlLogic.createTinyUrl(url2);

            // assert
            expect(result1.shortenUrl).not.toBe(result2.shortenUrl);
        });

        it("https://www.a.com 和 www.a.com會有一樣的縮網址", async () => {
            // arrange
            const url1 = "https://www.a.com";
            const url2 = "www.a.com";

            // act
            const result1 = await UrlLogic.createTinyUrl(url1);
            const result2 = await UrlLogic.createTinyUrl(url2);

            // assert
            expect(result1.shortenUrl).toBe(result2.shortenUrl);
        });

        it("如果縮的網址沒過期，會回傳一樣的縮網址；過期了會建一個新的並回傳不一樣的", async () => {
            // arrange
            const url = "www.a.com";
            const result = await UrlLogic.createTinyUrl(url);
            const unexpiredResult = await UrlLogic.createTinyUrl(url);
            process.env.EXPIRED_DURATION = 2000;
            await new Promise((r) => setTimeout(r, 2000));

            // act
            const expiredResult = await UrlLogic.createTinyUrl(url);

            // assert
            expect(result).toEqual(unexpiredResult);
            expect(result).not.toEqual(expiredResult);
        }, 10000);
    });
    describe("測試redirectUrl", () => {
        it("輸入從createTinyUrl回傳的短網址，導回原本的網址", async () => {
            // arrange
            const url = "www.google.com";
            const { shortenUrl } = await UrlLogic.createTinyUrl(url);
            const redirectUrl = `https://${url}`;

            // act
            const {
                status,
                headers: { location },
            } = await request.get(`/${shortenUrl.slice(-6)}`);

            // assert
            expect(status).toBe(302);
            expect(location).toBe(redirectUrl);
        });
        it("過期的短網址回傳404", async () => {
            // arrange
            const url = "www.google.com";
            const { shortenUrl } = await UrlLogic.createTinyUrl(url);
            const redirectUrl = `https://${url}`;
            process.env.EXPIRED_DURATION = 2000;
            await new Promise((r) => setTimeout(r, 2000));

            // act
            const { status } = await request.get(`/${shortenUrl.slice(-6)}`);

            // assert
            expect(status).toBe(404);
        });
    });
});
