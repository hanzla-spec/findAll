const ProfleDTO = {
    profileId: '',
    displayName: '',
    avatar: '',
    point: 0,
    badge: ''
}

const QuestionDTOs = {
    QuestionDTO: {
        questionId: '',
        title: '',
        body: '',
        tags: '',
        vote: 0,
        askedAt: null,
        isEdited: '',
        editedAt: null,
        profile: ProfleDTO
    }
}

export default QuestionDTOs;