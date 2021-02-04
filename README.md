# skill-tuner

A MERN stack web application that helps you learn new skills and earn points.

## Functionalities

We need to make API routes for these. Add more if necessary.

### Admin/Creator

- [ ] Can add a course
- [ ] Can delete a course
- [ ] Can add content to a course
- [ ] Can add quiz to a content
- [ ] Can create other admins
- [ ] Can block a user
- [ ] Can review course requets

### User

- [ ] User can register for an account and sign in
- [ ] User can have a profile picture
- [ ] User has to specify their Subjects and Areas of Interests (skills)
- [ ] User can take / drop course
- [ ] User can search for all courses (filter by various criteria; smart search)
- [ ] User can view their recommended courses
- [ ] User can view all the courses that they are currently taking
- [ ] User can get entire course material
- [ ] User can view a specific section (single content page) of the entire course
- [ ] User can see their stats on a course (total points earned for that course, total time spent, % completed etc.)
- [ ] User can send their feedback on a course (rating)
- [ ] User can answer quiz questions
- [ ] User can also create a TODO list. (CRD, no edit)
- [ ] User can chat with a general chat bot that answers questions about the entire SITE (not related to any specific course)
- [ ] User can view other people's profile and see what courses that user is taking and their stats

### Course

- [ ] Course should have a title and a subject (and also skills)
- [ ] Course must have an estimated time to completion
- [ ] Course can have a description
- [ ] Course can have associated content
- [ ] Course has a leader-board (top scorers from quizzes.)
- [ ] Courses can have sections (arbitrary collections of content, e.g Week 1-2, 3-4, etc.)

### Content (Single Unit of a Course)

- [ ] Content is dynamic. Could be text, video, link, etc.
- [ ] Content must have 0 or 1 associated Quiz
- [ ] Content has a "Done" button to be clicked by User when they have finished
      consuming the content
- [ ] Time when the user completed content should be recorded for stats.

### Quiz

- [ ] Quiz has creator specific total points
- [ ] Quiz can have multiple questions
- [ ] Each question has same point (# of questions / total)
- [ ] Entire quiz will be checked on submission
- [ ] Time when the user completed quiz should be recorded for stats.

### Others

- [ ] User can create their own course
