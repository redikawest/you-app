import { Response } from "express"

export const errorResponse = (res: Response, code: number, message: string) => {
    return res.status(code).json({
        code: code,
        message: message
    })
}

export const successResponse = (res: Response, code: number, message: string, data?: any) => {
    return res.status(code).json({
        code: code,
        message: message,
        data: data
    })
}