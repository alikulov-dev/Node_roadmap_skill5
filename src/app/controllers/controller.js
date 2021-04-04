import { validationResult } from "express-validator";
import { ContactModel, TaskModel } from "../models/index";

class Controller {

    /**
     *  Add a new Task
     * @param req 
     * @param res 
     */
    createTask = async (req, res) => {
        const data = {
            name: req.body.name,
            contact_id: req.body.contact_id,
            is_approved: req.body.is_approved
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({
                status: "Error",
                name_ru: 10022,
                message: {
                    en: "Something went wrong! Please try again!",
                    uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                    ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                },
                error: errors,
            });
        }
        try {
            const dataAdd = new TaskModel(data);
            await dataAdd
                .save()
                .then(async (obj) => {
                    console.log("Ma'lumotlar qo'shildi");
                    // Return response
                    // res.redirect("/a");
                    // res.render("task", {
                    //     success: true, 
                    //     message: "Ma'lumot: " + obj.name_uz + " yuklandi, Administratorlar tomonidan ko'rib chiqiladi!" 
                    // });
                    res.status(200).json({
                        status: "Success",
                        data: obj
                    });
                })
                .catch((reason) => {
                    if (reason.errors["name"].message) {
                        res.status(500).json({
                            status: "Error",
                            name_ru: 10001,
                            message: {
                                en: reason.errors["name"].message,
                                uz: "Номи талаб қилинади!",
                                ru: "Название обязательно",
                            },
                        });
                    }
                    else {
                        res.status(500).json({
                            status: "Error",
                            name_ru: 10000,
                            message: {
                                en: "Something went wrong! Please try again!",
                                uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                                ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                            },
                            error: error,
                        });
                    }
                });
        } catch (error) {
            res.status(500).json({
                status: "Error",
                name_ru: 10000,
                message: {
                    en: "Something went wrong! Please try again!",
                    uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                    ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                },
                error: error,
            });
        }
    };
    /**
     *  Add a new Contact
     * @param req 
     * @param res 
     */
    createContact = async (req, res) => {
        const data = {
            name: req.body.name,
            contact: req.body.contact
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({
                status: "Error",
                name_ru: 10022,
                message: {
                    en: "Something went wrong! Please try again!",
                    uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                    ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                },
                error: errors,
            });
        }
        try {
            const dataAdd = new ContactModel(data);
            await dataAdd
                .save()
                .then(async (obj) => {
                    console.log("Ma'lumotlar qo'shildi");
                    console.log(obj);
                    // Return response
                    // res.redirect("/a");
                    // res.render("task", {
                    //     success: true, 
                    //     message: "Ma'lumot: " + obj.name_uz + " yuklandi, Administratorlar tomonidan ko'rib chiqiladi!" 
                    // });
                    res.status(200).json({
                        status: "Success",
                        data: obj
                    });
                })
                .catch((reason) => {
                    if (reason.errors["name"].message) {
                        res.status(500).json({
                            status: "Error",
                            name_ru: 10001,
                            message: {
                                en: reason.errors["name"].message,
                                uz: "Номи талаб қилинади!",
                                ru: "Название обязательно",
                            },
                        });
                    }
                    else {
                        res.status(500).json({
                            status: "Error",
                            name_ru: 10000,
                            message: {
                                en: "Something went wrong! Please try again!",
                                uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                                ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                            },
                            error: error,
                        });
                    }
                });
        } catch (error) {
            res.status(500).json({
                status: "Error",
                name_ru: 10000,
                message: {
                    en: "Something went wrong! Please try again!",
                    uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                    ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                },
                error: error,
            });
        }
    };

    /**
     * Get Contact list
     * @param {*} req 
     * @param {*} res 
     */
    IndexContact = async (req, res) => {

        ContactModel.find()
            .exec(function (err, data) {
                if (err) {
                    return res.status(404).json({
                        status: "Error",
                        name_ru: 10004,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Данные не найдены!",
                        },
                    });
                }
                return res.send(data);
            });
    };
    /**
     * Get IndexContactbyId list
     * @param {*} req 
     * @param {*} res 
     */
    IndexContactbyId = async (req, res) => {

        ContactModel.find({
            _id: req.params.id
        })
            .exec(function (err, data) {
                if (err) {
                    return res.status(404).json({
                        status: "Error",
                        name_ru: 10004,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Данные не найдены!",
                        },
                    });
                }
                return res.send(data);
            });
    };
    /**
     * Get Task list
     * @param {*} req 
     * @param {*} res 
     */
    IndexTask = async (req, res) => {

        TaskModel.find({
            // is_active: isActive,
        })
            .populate('contact_id', '-_id')
            // .select('name contact')
            .exec(function (err, data) {
                if (err) {
                    console.log(data);
                    return res.status(404).json({
                        status: "Error",
                        name_ru: 10004,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Данные не найдены!",
                        },
                    });
                }
                return res.send(data);
            });
    };
    /**
     * Get Task by id list
     * @param {*} req 
     * @param {*} res 
     */
    IndexTaskbyId = async (req, res) => {
        console.log(req.params.id);
        TaskModel.find({
            _id: req.params.id
        })
            .exec(function (err, data) {
                if (err) {
                    console.log(data);
                    return res.status(404).json({
                        status: "Error",
                        name_ru: 10004,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Данные не найдены!",
                        },
                    });
                }
                // console.log(data);
                return res.send(data);
            });
    };

    /**
     * PUT Update info
     * @param req 
     * @param res 
     */

    updateDataTask = async (req, res) => {
        const id = req.params.id;
        TaskModel.updateOne({
            "_id": id
        }, {
            "name": req.body.name,
            "contact_id": req.body.contact_id
        })
            .then((msg) => {
                if (!msg) {
                    return res.status(404).json({
                        status: "Error",
                        code: 100024,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Страна не найдена",
                        },
                    });
                }
                return res.status(200).json({
                    status: "Success",
                    code: 100024
                });
            })
            .catch((err) => {
                if (err) {
                    return res.status(500).json({
                        status: "Error",
                        code: 10000,
                        message: {
                            en: "Something went wrong! Please try again!",
                            uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                            ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                        },
                        error: err,
                    });
                }
            });
    };
    /**
     * PUT Update info
     * @param req 
     * @param res 
     */

    updateDataContact = async (req, res) => {
        const id = req.params.id;
        ContactModel.updateOne({
            "_id": id
        }, {
            "name": req.body.name,
            "contact": req.body.contact
        })
            .then((msg) => {
                if (!msg) {
                    return res.status(404).json({
                        status: "Error",
                        code: 100024,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Страна не найдена",
                        },
                    });
                }
                return res.status(200).json({
                    status: "Success",
                    code: 100024
                });
            })
            .catch((err) => {
                if (err) {
                    return res.status(500).json({
                        status: "Error",
                        code: 10000,
                        message: {
                            en: "Something went wrong! Please try again!",
                            uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                            ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                        },
                        error: err,
                    });
                }
            });
    };
    /**
     * Delete  info
     * @param req 
     * @param res 
     */

    deleteDataTask = async (req, res) => {
        const id = req.params.id;
        TaskModel.findOneAndRemove({ "_id": id }, { new: true, })
            .then((msg) => {
                if (!msg) {
                    return res.status(404).json({
                        status: "Error",
                        code: 100024,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Страна не найдена",
                        },
                    });
                }
                return res.status(200).json({
                    status: "Success",
                    code: 100024
                });
            })
            .catch((err) => {
                if (err) {
                    return res.status(500).json({
                        status: "Error",
                        code: 10000,
                        message: {
                            en: "Something went wrong! Please try again!",
                            uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                            ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                        },
                        error: err,
                    });
                }
            });
    };
    /**
     * Delete  info
     * @param req 
     * @param res 
     */

    deleteDataContact = async (req, res) => {
        const id = req.params.id;
        ContactModel.findOneAndRemove({ "_id": id }, { new: true, })
            .then((msg) => {
                if (!msg) {
                    return res.status(404).json({
                        status: "Error",
                        code: 100024,
                        message: {
                            en: "No information found!",
                            uz: "Маълумот топилмади!",
                            ru: "Страна не найдена",
                        },
                    });
                }
                return res.status(200).json({
                    status: "Success",
                    code: 100024
                });
            })
            .catch((err) => {
                if (err) {
                    return res.status(500).json({
                        status: "Error",
                        code: 10000,
                        message: {
                            en: "Something went wrong! Please try again!",
                            uz: "Нимадир нотўғри бажарилди! Илтимос, яна бир бор уриниб кўринг!",
                            ru: "Что-то пошло не так! Пожалуйста, попробуйте еще раз!",
                        },
                        error: err,
                    });
                }
            });
    };
}
export default Controller;