import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { moduleServices } from "./module.service";

const createModule = catchAsync(async (req, res) => {
  const module = await moduleServices.createModuleIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Module created Successfully",
    data: module,
  });
});

export const moduleController = {
  createModule,
};
