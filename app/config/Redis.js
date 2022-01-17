import Redis from "ioredis";

// k: ori => v: short
export const shortenUrlRedis = new Redis({ db: 0 });
// k: short => v: ori
export const originalUrlRedis = new Redis({ db: 1 });
// unusedKey -> redis -> used
// export const memKeyRedis = new Redis({ db: 2 });
