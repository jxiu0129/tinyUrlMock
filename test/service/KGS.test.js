import KGS from "../../app/services/KeyGenerate.service";
import { connectDB } from "../../app/config";
import {
    search_all_from_UnusedKeys,
    search_one_from_UnusedKeys,
    search_unusedKey_by_key,
    search_usedKey_by_key,
} from "../../app/dao/KGS.dao";
import AdminLogic from "../../app/logic/admin.logic";
import UrlLogic from "../../app/logic/url.logic";
import { find_exist_url } from "../../app/dao/url.dao";

describe("測試key generating service", () => {
    beforeAll(async () => {
        await connectDB();
        await KGS.createNewKeys();
    });

    afterAll(async () => {
        await AdminLogic.clearAll();
        await KGS.createNewKeys();
    });
    describe("create_new_keys", () => {
        it("在unused keys DB中新增大約50筆新key", async () => {
            // arrange
            const allCurrentKeys = await search_all_from_UnusedKeys();
            const currentKeysCount = allCurrentKeys.length;

            // act
            await KGS.createNewKeys();

            // assert
            const newKeysCount = await search_all_from_UnusedKeys();
            expect(newKeysCount.length - currentKeysCount).toBe(50);
        });
    });
    describe("set_keys_used", () => {
        it("把key從未使用db丟到使用過db", async () => {
            // arrange
            const { uniqueKey } = await search_one_from_UnusedKeys();

            // act
            await KGS.setKeysUsed(uniqueKey);

            // assert
            const usedKeyResult = await search_usedKey_by_key(uniqueKey);
            const unusedKeyResult = await search_unusedKey_by_key(uniqueKey);
            expect(usedKeyResult[0].uniqueKey).toBe(uniqueKey);
            expect(unusedKeyResult.length).toBe(0);
        });
    });
    describe("set_keys_unused", () => {
        it("把key從使用過丟回未使用DB", async () => {
            // arrange
            const { uniqueKey } = await search_one_from_UnusedKeys();
            await KGS.setKeysUsed(uniqueKey);
            // act
            await KGS.setKeysUnused(uniqueKey);
            // assert
            const usedKeyResult = await search_usedKey_by_key(uniqueKey);
            const unusedKeyResult = await search_unusedKey_by_key(uniqueKey);
            expect(unusedKeyResult[0].uniqueKey).toBe(uniqueKey);
            expect(usedKeyResult.length).toBe(0);
        });
    });
    describe("url_expired", () => {
        it("把url(過期的)刪掉，把key從used丟回unused", async () => {
            // arrange
            const testUrl = "www.test.com";
            const res = await UrlLogic.createTinyUrl(testUrl);
            const shortenUrl = res.shortenUrl.slice(-6);
            // act
            await KGS.url_expired(shortenUrl);
            // assert
            const res1 = await find_exist_url(shortenUrl);
            const res2 = await search_unusedKey_by_key(shortenUrl);
            const res3 = await search_usedKey_by_key(shortenUrl);
            expect(res1).toBeNull();
            expect(res2[0].uniqueKey).toBe(shortenUrl);
            expect(res3.length).toBe(0);
        });
    });
});
