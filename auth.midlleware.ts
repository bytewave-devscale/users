import { Request, Response, NextFunction } from "express";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { accessToken, refreshToken } = req.body.tokens;

    const authResponse = await fetch(
      `${process.env.API_URI}/api/v1/auth/authorize`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken, refreshToken }),
      }
    );

    const authData = await authResponse.json();

    if (authData.error) {
      return res.status(401).json({ error: authData.error });
    }

    req.body.authData = authData;

    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ error: "authorization failed" });
    }
  }
}
