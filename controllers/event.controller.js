const eventModel = require(`../models/index`).event;
const Op = require(`sequelize`).Op;
const path = require(`path`);
const fs = require(`fs`);
const upload = require(`./upload-image`).single(`image`);

exports.getAllEvent = async (request, response) => {
  /** call findAll() to get all data */
  let events = await eventModel.findAll();
  return response.json({
    success: true,
    data: events,
    message: `All Events have been loaded`,
  });
};

exports.findEvent = async (request, response) => {
  /** define keyword to find data */
  let keyword = request.params.key;
  /** call findAll() within where clause and operation
   * to find data based on keyword */
  let events = await eventModel.findAll({
    where: {
      [Op.or]: [
        { eventName: { [Op.substring]: keyword } },
        { eventDate: { [Op.substring]: keyword } },
        { venue: { [Op.substring]: keyword } },
        { price: { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: events,
    message: `All Events have been loaded`,
  });
};

exports.addEvent = async (request, response) => {
  try {
    // Upload the file
    await upload(request, response);

    // Check for upload errors
    if (request.uploadError) {
      return response.json({ message: request.uploadError });
    }

    // Check if file is empty
    if (!request.file) {
      return response.json({ message: 'Nothing to Upload' });
    }

    // Extract event data from request
    const newEvent = {
      eventName: request.body.eventName,
      eventDate: request.body.eventDate,
      venue: request.body.venue,
      price: request.body.price,
      image: request.file.filename,
    };

    // Validate event data (optional)
    // You can add validation logic here to ensure required fields are present and in the correct format

    // Create new event
    const createdEvent = await eventModel.create(newEvent);

    // Send successful response with created event data
    return response.json({
      success: true,
      data: createdEvent,
      message: 'New event has been inserted',
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateEvent = async (request, response) => {
  /** run upload function */
  upload(request, response, async (error) => {
    /** check if there are error when upload */
    if (error) {
      return response.json({ message: error });
    }
    /** store selected event ID that will update */
    let eventID = request.params.id;
    /** prepare event's data that will update */
    let dataEvent = {
      eventName: request.body.eventName,
      eventDate: request.body.eventDate,
      venue: request.body.venue,
      price: request.body.price,
    };
    /** check if file is not empty,
     * it means update data within reupload file
     */
    if (request.file) {
      /** get selected event's data */
      const selectedEvent = await eventModel.findOne({
        where: { eventID: eventID },
      });
      /** get old filename of image file */
      const oldImage = selectedEvent.image;
      /** prepare path of old image to delete file */
      const pathImage = path.join(__dirname, `../image`, oldImage);
      /** check file existence */
      if (fs.existsSync(pathImage)) {
        /** delete old image file */
        fs.unlink(pathImage, (error) => console.log(error));
      }
      /** add new image filename to event object */
      dataEvent.image = request.file.filename;
    }
    /** execute update data based on defined id event */
    eventModel
      .update(dataEvent, { where: { eventID: eventID } })
      .then((result) => {
        /** if update's process success */
        return response.json({
          success: true,
          message: `Data event has been updated`,
        });
      })
      .catch((error) => {
        /** if update's process fail */
        return response.json({
          success: false,
          message: error.message,
        });
      });
  });
};

exports.deleteEvent = async (request, response) => {
  /** store selected event's ID that will be delete */
  const eventID = request.params.id;
  /** -- delete image file -- */
  /** get selected event's data */
  const event = await eventModel.findOne({ where: { eventID: eventID } });
  /** get old filename of image file */
  const oldImage = event.image;
  /** prepare path of old image to delete file */
  const pathImage = path.join(__dirname, `../image`, oldImage);
  /** check file existence */
  if (fs.existsSync(pathImage)) {
    /** delete old image file */
    fs.unlink(pathImage, (error) => console.log(error));
  }
  /** -- end of delete image file -- */
  /** execute delete data based on defined id event */
  eventModel
    .destroy({ where: { eventID: eventID } })
    .then((result) => {
      /** if update's process success */
      return response.json({
        success: true,
        message: `Data event has been deleted`,
      });
    })
    .catch((error) => {
      /** if update's process fail */
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
