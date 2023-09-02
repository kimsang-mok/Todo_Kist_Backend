import { Group, List } from "../models/Todo.js"
import _ from "lodash"

export const getAllGroups = async (req, res, next) => {
    const defaultGroup = ["Today", "Important", "Task"]
    try {
        const foundGroup = await Group.find()
        if (foundGroup.length === 0) {
            const groupPromises = defaultGroup.map(item => {
                const group = new Group({ name: item });
                return group.save();
            });
            await Promise.all(groupPromises);
        }
        req.foundGroup = foundGroup
        next()
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ error: "An error occurred." });
    }
}

export const createGroup = async (req, res) => {
    try {
        const newGroup = _.capitalize(req.body.name);
        const group = new Group({ name: newGroup });
        await group.save();
        res.status(201).json({ newAddedGroup: group, message: "Group created." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred." });
    }
}

export const deleteGroupAndCorrespondingTaskList = async (req, res) => {
    const groupName = req.params.groupName
    console.log(groupName)
    try {
        await Group.findOneAndDelete({ name: groupName })
        // Drop document
        await List.findOneAndDelete({ name: groupName })
        res.status(200).json({ message: `${groupName} and corresponding todos deleted successfully` })
    }
    catch (err) {
        console.error(err)
    }
}
