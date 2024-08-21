import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const getProjects = async (req, res) => {
  try {
    const allProjects = await Project.find().select("-password");
    res.status(200).json(allProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const allTasks = await Task.find().select("-password");
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addProject = async (req, res) => {
  try {
    const {
      projectID,
      projectName,
      description,
      startDate,
      endDate,
      finished,
    } = req.body;

    console.log(
      projectID,
      projectName,
      description,
      startDate,
      endDate,
      finished
    );

    const newProject = new Project({
      projectID,
      projectName,
      description,
      startDate,
      endDate,
      finished,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const addTask = async (req, res) => {
  try {
    const { taskID, taskName, description, startDate, endDate, projectID } =
      req.body;

    console.log(taskID, taskName, description, startDate, endDate, projectID);

    const newTask = new Task({
      taskID,
      taskName,
      description,
      startDate,
      endDate,
      projectID,
      userID: "",
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateTaskUser = async (req, res) => {
  const { id, userID } = req.params;
  console.log(id, userID);

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.userID = userID;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { projectID } = req.params;

    const project = await Project.findById(projectID);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await Project.deleteOne({ projectID: projectID });

    res.status(200).json(Project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskID } = req.params;

    const task = await Task.findById(taskID);
    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }

    await Task.deleteOne({ taskID: taskID });

    res.status(200).json(Task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
