export default {
    editor: {
        settings: [
            {
                label: 'Define redirections (URLs)',
                icon: 'open-out',
                edit: () => import('./src/components/Redirections/SettingsEdit.vue'),
                summary: () => import('./src/components/Redirections/SettingsSummary.vue'),
                getIsValid(settings) {
                    const { afterNotSignInPageId } = settings.publicData;
                    return !!afterNotSignInPageId;
                },
            },
        ],
        // designSystemId: 'ec2eebfe-499b-43c4-b260-80ee5a4d9504',
    },
    variables: [
        { name: 'user', value: 'user', type: 'object', defaultValue: null },
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
                { name: 'Custom attributes', type: 'array' },
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
            name: 'Change Password',
            code: 'changePassword',
            parameters: [
                { name: 'Old Password', type: 'string' },
                { name: 'New Password', type: 'string' },
            ],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/ChangePassword.vue'),
            getIsValid([oldPassword, newPassword]) {
                return !!oldPassword && !!newPassword;
            },
            /* wwEditor:end */
        },
        {
            name: 'Forgot Password',
            code: 'forgotPassword',
            parameters: [{ name: 'Email', type: 'string' }],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/ForgotPassword.vue'),
            getIsValid([email]) {
                return email;
            },
            /* wwEditor:end */
        },
        {
            name: 'Confirm Password',
            code: 'confirmPassword',
            parameters: [
                { name: 'Verification Code', type: 'string' },
                { name: 'New Password', type: 'string' },
            ],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/ConfirmPassword.vue'),
            getIsValid([verificationCode, newPassword]) {
                return !!verificationCode && !!newPassword;
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
