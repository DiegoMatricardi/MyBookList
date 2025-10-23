import express from "express";
import path from "path";
import __dirname from "../utils/pathUtils.js";
import fs from "fs";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import cors from "cors"

const urlencodedMiddleware = express.urlencoded({extended: true});
const jsonMiddleware = express.json();
const securityMiddleware = helmet();
const compressionMiddleware = compression();
const rateLimitMiddleware = rateLimit({
    windowMs: 10 * 60 * 1000,  
    max: 100,                  
    message: 'Muitas requisições, tente novamente em 10 minutos.'
});
const logFile = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags:'a'});
const morganMiddleware = morgan('combined', { stream: logFile});

const corsMiddleware = cors({
    origin: '*'
});

export {
    urlencodedMiddleware,
    jsonMiddleware,
    securityMiddleware,
    compressionMiddleware, 
    rateLimitMiddleware,
    morganMiddleware,
    corsMiddleware
};