import express, { Request, Response } from "express";
const app = express.Router();
import { body, param, matchedData } from "express-validator";
import { CampgroundModel } from "../models/campground";
import { checkValidation } from "../middlewares/validations";
import { Types } from "mongoose";

app.get("/", async (_: Request, res: Response) => {
  const campgrounds = await CampgroundModel.find();
  res.render('campgrounds/index', { campgrounds });
});


app.post('/', async (req: Request, res: Response) => {
  const campground = new CampgroundModel(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`)
})

app.put('/:id',
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const campground = await CampgroundModel.findByIdAndUpdate(id, { ... req.body.campground });
    if (!campground) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(campground)
  });
  

app.get("/:id",
  param("id").isMongoId(),
  checkValidation,
  async (req: Request, res: Response) => {
    const campground = await CampgroundModel.findById(matchedData(req).id);

    if (!campground) {
      return res.status(404).json({ message: "User not found" });
    }
    res.render('campgrounds/show', { campground });
  }
);

app.get("/:id/edit",
  param("id").isMongoId(),
  checkValidation,
  async (req: Request, res: Response) => {
    const campground = await CampgroundModel.findById(matchedData(req).id);

    if (!campground) {
      return res.status(404).json({ message: "User not found" });
    }
    res.render('campgrounds/edit', { campground });
  }
);


export default app;