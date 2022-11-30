import { prisma } from "./database/connection";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { convertHoursStringInMinutes } from "./utils/convertHoursStringInMinutes";
import { converMinutesInHoursString } from "./utils/converMinutesInHoursString";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/games", async (req, res) => {
  const data = await prisma.game.findMany({
    include: { _count: { select: { ads: true } } },
  });

  return res.json(data);
});

app.get("/games/:adId/discord", async (req, res) => {
  const { adId } = req.params;

  const ad = await prisma.ad.findUniqueOrThrow({
    where: { id: Number(adId) },
    select: { discord: true },
  });

  return res.json({ discord: ad.discord });
});

app.get("/games/:gameId/ads", async (req, res) => {
  const gameId = Number(req.params.gameId);

  const ads = await prisma.ad.findMany({
    where: {
      gameId,
    },
    select: {
      id: true,
      name: true,
      hoursEnd: true,
      useVoiceChannel: true,
      hourStart: true,
      yearsPlaying: true,
      weekDays: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(
    ads.map((ad) => {
      return {
        ...ad,
        hoursEnd: converMinutesInHoursString(ad.hoursEnd),
        hourStart: converMinutesInHoursString(ad.hourStart),
      };
    })
  );
});

app.get("/", async (req, res) => {
  console.log({ body: req.body, param: req.params, query: req.query });
});

app.post("/games/:gameId/ads", async (req, res) => {
  const gameId = Number(req.params.gameId);
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      discord: body.discord,
      hoursEnd: convertHoursStringInMinutes(body.hoursEnd),
      hourStart: convertHoursStringInMinutes(body.hourStart),
      name: body.name,
      useVoiceChannel: body.useVoiceChannel,
      weekDays: body.weekDays,
      yearsPlaying: body.yearsPlaying,
      createdAt: body.createdAt,
    },
  });

  return res.json(ad);
});

app.listen(process.env.PORT, () => {
  console.log(`Rodando na porta ${process.env.PORT}`);
});
