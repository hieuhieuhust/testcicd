import test from "node:test";
import assert from "node:assert/strict";
import { addTask, toggleTask, removeTask, loadTasks } from "../public/tasks.js";

test("thêm việc sẽ bỏ khoảng trắng thừa", () => {
  assert.deepEqual(addTask([], "  Học CI  ", "1"), [{ id: "1", title: "Học CI", done: false }]);
});

test("không thêm việc rỗng", () => {
  const tasks = [];
  assert.equal(addTask(tasks, "   ", "1"), tasks);
});

test("đánh dấu hoàn thành rồi đánh dấu lại", () => {
  const tasks = [{ id: "1", title: "Chạy test", done: false }];
  assert.equal(toggleTask(tasks, "1")[0].done, true);
  assert.equal(toggleTask(toggleTask(tasks, "1"), "1")[0].done, false);
  assert.equal(tasks[0].done, false);
});

test("xóa đúng việc đã chọn", () => {
  const tasks = [{ id: "1", title: "Một", done: false }, { id: "2", title: "Hai", done: false }];
  assert.deepEqual(removeTask(tasks, "1"), [tasks[1]]);
});

test("dữ liệu lưu bị lỗi không làm hỏng ứng dụng", () => {
  assert.deepEqual(loadTasks("không phải JSON"), []);
  assert.deepEqual(loadTasks("{}"), []);
  assert.deepEqual(loadTasks('[{"id":"1","title":"Học CD","done":false}]'), [{ id: "1", title: "Học CD", done: false }]);
});
