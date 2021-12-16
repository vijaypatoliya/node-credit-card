export const responseMessage = {
    appResponse: {
        corsError: 'Access denied by CORS',
    },
    passportResponse: {
        accessTokenMissingError: 'Access token missing in header',
    },
    authControllerResponse: {
        loginSuccess: 'User login successfully',
        signUpSuccess: 'User signUp successfully',
        userUpdateSuccess: 'User updated successfully',
        userAlreadyExistError: 'User Already exist', 
        getUserSuccess: 'User fetched successfully',
        getUserError: 'User does not exist',
        userNotAuthorizationError: 'User not authorized',
        parentIdMissingError: 'ParentId is missing',
        getParentDetailsError: 'Parent details not found',
        childDependencyError: 'User can not deleted due to have childs'
    },
    credControllerResponse: {
        createCredSuccess: 'Cred added successfully',
        updateCredSuccess: 'Cred updated successfully',
        deleteCredSuccess: 'Cred deleted successfully',
        fetchCredSuccess: 'Cred details fetched successfully',
        createCredFailure: 'Failed to add cred',
        getCredFailure: 'Failed to fetch cred details',
        userRelationError: "User does not have relation with child"
    }
}
