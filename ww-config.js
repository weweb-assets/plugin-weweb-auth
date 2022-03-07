export default {
    editor: {
        settings: [],
        // designSystemId: 'ec2eebfe-499b-43c4-b260-80ee5a4d9504',
    },
    variables: [
        { name: 'user', value: 'user', type: 'object', defaultValue: null },
        { name: 'accessToken', value: 'accessToken', type: 'string', defaultValue: null },
        { name: 'refreshToken', value: 'refreshToken', type: 'string', defaultValue: null },
        { name: 'isAuthenticated', value: 'isAuthenticated', type: 'boolean', defaultValue: false },
    ],
    functions: [
        {
            name: 'Sign Up',
            code: 'signUp',
            parameters: [
                { name: 'Email', type: 'string' },
                { name: 'Password', type: 'string' },
                { name: 'Name', type: 'string' },
            ],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/SignUp.vue'),
            getIsValid([email, password]) {
                return !!email && !!password;
            },
            /* wwEditor:end */
        },
        {
            name: 'Login',
            code: 'login',
            parameters: [
                { name: 'Email', type: 'string' },
                { name: 'Password', type: 'string' },
            ],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Login.vue'),
            getIsValid([email, password]) {
                return !!email && !!password;
            },
            /* wwEditor:end */
        },
        {
            name: 'Update User Profile',
            code: 'updateUserProfile',
            parameters: [
                { name: 'Email', type: 'string' },
                { name: 'Name', type: 'string' },
                { name: 'Picture', type: 'string' },
                { name: 'Custom attributes', type: 'object' },
            ],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/UpdateUserProfile.vue'),
            getIsValid([email]) {
                return !!email;
            },
            /* wwEditor:end */
        },
        {
            name: 'Logout',
            code: 'logout',
            parameters: [],
        },
    ],
};
