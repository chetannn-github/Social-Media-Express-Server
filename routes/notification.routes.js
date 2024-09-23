import { Router } from "express";
import { deleteAllNotifications, getAllNotifications, readAllNotifications } from "../controllers/notification.controller.js";

export const notificationRoutes = Router();

notificationRoutes.route("/")
.get(getAllNotifications)
.patch(readAllNotifications)
.delete(deleteAllNotifications);