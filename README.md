# skill-tuner

A MERN stack web application that helps you learn new skills and earn points.

## Functionalities

We need to make API routes for these. Add more if necessary.

### Admin/Creator

- [x] Can add a course
- [x] Can delete a course
- [x] Can add content to a course
- [x] Can add quiz to a content
- [x] Can create other admins
- [x] Can block a user
- [ ] Can review course requets

### User

- [x] User can register for an account and sign in
- [x] User can have a profile picture
- [x] User has to specify their Subjects and Areas of Interests (skills)
- [x] User can take / drop course
- [x] User can search for all courses (filter by various criteria; smart search)
- [ ] User can view their recommended courses
- [x] User can view all the courses that they are currently taking
- [x] User can get entire course material
- [x] User can view a specific section (single content page) of the entire course
- [ ] User can see their stats on a course (total points earned for that course, total time spent, % completed etc.)
- [x] User can send their feedback on a course (rating)
- [ ] User can answer quiz questions
- [ ] User can also create a TODO list. (CRD, no edit)
- [ ] User can chat with a general chat bot that answers questions about the entire SITE (not related to any specific course)
- [ ] User can view other people's profile and see what courses that user is taking and their stats

### Course

- [x] Course should have a title and a subject (and also skills)
- [x] Course must have an estimated time to completion
- [x] Course can have a description
- [x] Course can have associated content
- [ ] Course has a leader-board (top scorers from quizzes.)
- [ ] Courses can have sections (arbitrary collections of content, e.g Week 1-2, 3-4, etc.)

### Content (Single Unit of a Course)

- [x] Content is dynamic. Could be text, video, link, etc.
- [x] Content must have 0 or 1 associated Quiz
- [ ] Content has a "Done" button to be clicked by User when they have finished
      consuming the content
- [ ] Time when the user completed content should be recorded for stats.

### Quiz

- [x] Quiz has creator specific total points
- [x] Quiz can have multiple questions
- [x] Each question has same point (# of questions / total)
- [ ] Entire quiz will be checked on submission
- [ ] Time when the user completed quiz should be recorded for stats.

### Others

- [ ] User can create their own course
