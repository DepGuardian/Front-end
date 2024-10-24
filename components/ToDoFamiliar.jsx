import React, { useState } from "react";
import { Bell, Plus, Users, X } from "lucide-react";

const FamilyPlanner = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Ejemplo: Limpiar la casa",
      date: "2024-10-09",
      completed: false,
    },
  ]);

  const [members, setMembers] = useState([
    { id: 1, name: "Ejemplo: Juan Pérez", avatar: "/api/placeholder/32/32" },
  ]);

  const [newTask, setNewTask] = useState({ name: "", date: "" });
  const [newMember, setNewMember] = useState({ name: "" });
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.name && newTask.date) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          name: newTask.name,
          date: newTask.date,
          completed: false,
        },
      ]);
      setNewTask({ name: "", date: "" });
      setShowTaskModal(false);
    }
  };

  const addMember = (e) => {
    e.preventDefault();
    if (newMember.name) {
      setMembers([
        ...members,
        {
          id: members.length + 1,
          name: newMember.name,
          avatar: "/api/placeholder/32/32",
        },
      ]);
      setNewMember({ name: "" });
      setShowMemberModal(false);
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const removeMember = (memberId) => {
    setMembers(members.filter((member) => member.id !== memberId));
  };

  return (
    <div className="flex-1 bg-white p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Planner Familiar</h1>
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6" />
          <img
            src="/api/placeholder/32/32"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      {/* Tasks Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Tareas</h2>
        <button
          onClick={() => setShowTaskModal(true)}
          className="flex items-center mb-4 hover:bg-gray-100 p-2 rounded-lg w-full"
        >
          <Plus className="w-5 h-5 mr-2" />
          <span className="text-base">Agregar Tarea</span>
        </button>

        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between mb-4 bg-gray-50 p-2 rounded"
          >
            <div className="flex items-center">
              <div
                onClick={() => toggleTaskCompletion(task.id)}
                className={`w-5 h-5 border border-gray-300 rounded-full mr-3 cursor-pointer
                  ${
                    task.completed
                      ? "bg-blue-500 border-blue-500"
                      : "hover:bg-gray-100"
                  }`}
              />
              <span
                className={`text-base ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">
                {new Date(task.date).toLocaleDateString()}
              </span>
              <button
                onClick={() => removeTask(task.id)}
                className="text-red-500 hover:bg-red-100 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Members Section */}
      <div>
        <div className="flex items-center mb-4">
          <Users className="w-5 h-5 mr-2" />
          <h2 className="text-xl font-semibold">Miembros</h2>
        </div>

        <button
          onClick={() => setShowMemberModal(true)}
          className="flex items-center mb-4 hover:bg-gray-100 p-2 rounded-lg w-full"
        >
          <Plus className="w-5 h-5 mr-2" />
          <span className="text-base">Agregar miembro</span>
        </button>

        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between mb-4 bg-gray-50 p-2 rounded"
          >
            <div className="flex items-center">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-8 h-8 rounded-full mr-3"
              />
              <span className="text-base">{member.name}</span>
            </div>
            <button
              onClick={() => removeMember(member.id)}
              className="text-red-500 hover:bg-red-100 p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Agregar Nueva Tarea</h3>
            <form onSubmit={addTask}>
              <input
                type="text"
                placeholder="Nombre de la tarea"
                value={newTask.name}
                onChange={(e) =>
                  setNewTask({ ...newTask, name: e.target.value })
                }
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="date"
                value={newTask.date}
                onChange={(e) =>
                  setNewTask({ ...newTask, date: e.target.value })
                }
                className="w-full mb-4 p-2 border rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Member Modal */}
      {showMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-80">
            <h3 className="text-lg font-semibold mb-4">
              Agregar Nuevo Miembro
            </h3>
            <form onSubmit={addMember}>
              <input
                type="text"
                placeholder="Nombre del miembro"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
                className="w-full mb-4 p-2 border rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowMemberModal(false)}
                  className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyPlanner;
