### Api Scheme

Describe all endpoints existing in Api class.

Api response for **/subject-config/{subject-id}**
when subject can be divided for subjects, for example:
Math can be divided to Algebra and Geomtery.
```javascript
data: {
    subject: {
        name: 'Math',
        id: 'foo',
        subSubjects: [
            {
                name: 'Geometry',
                id: '123',
                themes: ['Theme 1', 'Theme 2']
            },
            {
                name: 'Algebra',
                id: '456',
                themes: ['Theme 1', 'Theme 2']
            }
        ],
        exams: {
            trainings: ['Variant 1', 'Variant 2'],
            sessions: ['2017', '2018']
        }
    }
}
```

Api response for **/subjects/configuration/{subject-name}**
when subject doesn't have sub subjects.
```javascript
data: {
    subject: {
        name: 'Math',
        id: 'foo',
        theme: ['Theme 1', 'Theme 2'],
        exams: {
            trainings: ['Variant 1', 'Variant 2'],
            sessions: ['2017', '2018']
        }
    }
}
```