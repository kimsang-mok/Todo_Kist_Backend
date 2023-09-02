import { Item, List } from "../models/Todo.js";
import _ from "lodash"

export const getAllTodos = async (req, res) => {
    const listName = _.capitalize(req.params.customListName);
    const foundGroup = req.foundGroup
    try {
        let foundList = await List.findOne({ name: listName });
        if (!foundList) {
            const list = new List({
                name: listName,
                items: []
            });
            await list.save()
            foundList = list;
        }
        const responseData = {
            foundList: foundList,
            foundGroup: foundGroup
        }
        res.json(responseData)
    }
    catch (err) {
        console.log(err)
    }
};

export const createTodo = async (req, res) => {
    const listName = _.capitalize(req.params.customListName);

    try {
        const foundList = await List.findOne({ name: listName });

        const item = new Item({
            title: req.body.title,
            priority: req.body.priority,
            description: req.body.description
        });

        foundList.items.push(item);
        await foundList.save();

        res.status(201).json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

export const toggleTodoComplete = async (req, res) => {
    const listName = _.capitalize(req.params.customListName);
    const itemId = req.params.id;
    try {
        const foundList = await List.findOne({ name: listName })
        const itemIndex = foundList.items.findIndex(item => item._id == itemId);
        foundList.items[itemIndex].complete = !foundList.items[itemIndex].complete
        await foundList.save()
        res.json(foundList)
    }
    catch (err) {
        console.error(err)
    }
}

export const deleteTodo = async (req, res) => {
    const listName = _.capitalize(req.params.customListName);
    const itemId = req.params.id;
    try {
        const foundList = await List.findOne({ name: listName })
        const itemIndex = foundList.items.findIndex(item => item._id == itemId);
        foundList.items.splice(itemIndex, 1)
        await foundList.save()
        res.json(foundList)
    }
    catch (err) {
        console.error(err)
    }
};

export const editTodo = async (req, res) => {
    const listName = _.capitalize(req.params.customListName)
    const itemId = req.params.id;
    try {
        const foundList = await List.findOne({ name: listName })
        const itemIndex = foundList.items.findIndex(item => item._id == itemId);
        foundList.items[itemIndex].title = req.body.title;
        foundList.items[itemIndex].priority = req.body.priority;
        foundList.items[itemIndex].description = req.body.description;
        await foundList.save()
        res.json(foundList)
    }
    catch (err) {
        console.error(err)
    }
}

export const searchTodo = async (req, res) => {
    const searchTerm = req.query.q;
    try {
        const results = await List.aggregate([
            {
                $unwind: "$items"
            },
            {
                $match: {
                    "items.title": {
                        $regex: new RegExp(searchTerm, 'i') // 'i' makes the search case-insensitive
                    }
                }
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    items: {
                        $push: "$items"
                    }
                }
            }
        ]);
        res.json(results);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};