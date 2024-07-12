import { useState } from 'react';
import './App.css'

const schools = [
  { schoolId: 123, title: 'School 123' },
  { schoolId: 456, title: 'School 456' },
];

const data = {
  '123': [
    {
      title: 'Course 1',
      courseId: 1,
      chapters: [
        {
          chapterTitle: 'Chapter 1',
          html: "<img style=\"max-width: 100%; max-height: 100%;\" src=\"https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/01/Capstone_Course.jpeg.jpg\" />",
        }
      ],
    },
  ],
  '456': [
    {
      title: 'Course 2',
      courseId: 2,
      chapters: [
        {
          chapterTitle: 'Chapter 1',
          html: "<style>.yellow { color: yellow; }</style><div><h1 class=yellow>Bob's Title</h1><ul><li>Bob 1</li><li>Bob 2</li></ul></div>",
        }
      ],
    }
  ]
};

function App() {
  const [school, setSchool] = useState();
  const [course, setCourse] = useState();

  const selectSchool = (_school) => {
    setSchool(_school);

    const dataCourse = data[_school.schoolId.toString()][0];
    setCourse(dataCourse);
  };

  const renderHTML = (html) => {
    return { __html: html };
  };

  const style = {
    maxWidth: '200px',
    maxHeight: '200px',
  };

  return (
    <>
      {schools.map((_school) => <div key={_school.schoolId}><a onClick={() => selectSchool(_school)}>{_school.title}</a></div>)}
      {school
        ?
          <>
            <div>----</div>
            <div>{school.title}</div>
            {course.chapters
              ?
                <>
                  {course.chapters.map((chapter) => (
                    <div key={course.courseId}>
                      <div>{chapter.chapterTitle}</div>
                      <div style={style} dangerouslySetInnerHTML={renderHTML(chapter.html)}></div>
                    </div>
                  ))}
                </>
              : null
            }
          </>
        : null
      }
    </>
  )
}

export default App
