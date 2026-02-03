<<<<<<< HEAD
// index.js
import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;

// Load the data
const rawData = fs.readFileSync('data.json', 'utf-8');
const db = JSON.parse(rawData);

// -------------------
// Level 1: Basic GET
// -------------------
app.get('/api/students', (req, res) => res.json(db.students));
app.get('/api/instructors', (req, res) => res.json(db.instructors));
app.get('/api/courses', (req, res) => res.json(db.courses));
app.get('/api/enrollments', (req, res) => res.json(db.enrollments));
app.get('/api/assignments', (req, res) => res.json(db.assignments));
app.get('/api/grades', (req, res) => res.json(db.grades));

// -------------------
// Level 2: Nested Resources
// -------------------

// Student's enrollments
app.get('/api/students/:id/enrollments', (req, res) => {
  const studentId = parseInt(req.params.id);
  const enrollments = db.enrollments.filter(e => e.studentId === studentId);
  res.json(enrollments);
});

// Student's courses
app.get('/api/students/:id/courses', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentEnrollments = db.enrollments.filter(e => e.studentId === studentId);
  const courses = db.courses.filter(c => studentEnrollments.some(e => e.courseId === c.id));
  res.json(courses);
});

// Students in a course
app.get('/api/courses/:id/students', (req, res) => {
  const courseId = parseInt(req.params.id);
  const courseEnrollments = db.enrollments.filter(e => e.courseId === courseId);
  const students = db.students.filter(s => courseEnrollments.some(e => e.studentId === s.id));
  res.json(students);
});

// Instructor's courses
app.get('/api/instructors/:id/courses', (req, res) => {
  const instructorId = parseInt(req.params.id);
  const courses = db.courses.filter(c => c.instructorId === instructorId);
  res.json(courses);
});

// Course assignments
app.get('/api/courses/:id/assignments', (req, res) => {
  const courseId = parseInt(req.params.id);
  const assignments = db.assignments.filter(a => a.courseId === courseId);
  res.json(assignments);
});

// Grades for an enrollment
app.get('/api/enrollments/:id/grades', (req, res) => {
  const enrollmentId = parseInt(req.params.id);
  const grades = db.grades.filter(g => g.enrollmentId === enrollmentId);
  res.json(grades);
});

// -------------------
// Level 3: Advanced Queries
// -------------------

// 1. Student GPA
app.get('/api/students/:id/gpa', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentEnrollments = db.enrollments.filter(e => e.studentId === studentId && e.grade);
  
  if(studentEnrollments.length === 0) return res.json({ gpa: 0 });

  // Map letter grades to points
  const gradePoints = { 'A':4, 'A-':3.7, 'B+':3.3, 'B':3, 'B-':2.7, 'C+':2.3, 'C':2, 'C-':1.7, 'D+':1.3, 'D':1, 'F':0 };
  const totalPoints = studentEnrollments.reduce((sum, e) => sum + (gradePoints[e.grade] || 0), 0);
  const gpa = totalPoints / studentEnrollments.length;
  res.json({ gpa: gpa.toFixed(2) });
});

// 2. Course average grade
app.get('/api/courses/:id/average', (req, res) => {
  const courseId = parseInt(req.params.id);
  const courseEnrollments = db.enrollments.filter(e => e.courseId === courseId);
  const courseGrades = db.grades.filter(g => courseEnrollments.some(e => e.id === g.enrollmentId));

  if(courseGrades.length === 0) return res.json({ average: 0 });

  const average = courseGrades.reduce((sum, g) => sum + g.score, 0) / courseGrades.length;
  res.json({ average: average.toFixed(2) });
});

// 3. Students taught by an instructor
app.get('/api/instructors/:id/students', (req, res) => {
  const instructorId = parseInt(req.params.id);
  const instructorCourses = db.courses.filter(c => c.instructorId === instructorId);
  const students = db.students.filter(s =>
    db.enrollments.some(e => e.studentId === s.id && instructorCourses.some(c => c.id === e.courseId))
  );
  res.json(students);
});

// 4. Student current schedule
app.get('/api/students/:id/schedule', (req, res) => {
  const studentId = parseInt(req.params.id);
  const currentEnrollments = db.enrollments.filter(e => e.studentId === studentId && e.status === 'enrolled');
  const schedule = db.courses
    .filter(c => currentEnrollments.some(e => e.courseId === c.id))
    .map(c => ({ code: c.code, name: c.name, schedule: c.schedule }));
  res.json(schedule);
});

// -------------------
// Start server
// -------------------
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
=======
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filepath = path.join(__dirname, "data.json");
const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));



>>>>>>> 3e1a0059be9989e69d30f91a810fb766245a06f0
