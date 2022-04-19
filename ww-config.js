export default {
    editor: {
        settings: [
            {
                label: 'Configuration',
                icon: 'advanced',
                edit: () => import('./src/components/Configuration/SettingsEdit.vue'),
                summary: () => import('./src/components/Configuration/SettingsSummary.vue'),
                getIsValid() {
                    return true;
                },
            },
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
        designSystemId: '053d6253-48d1-4298-9ddc-d6a542fa400a',
    },
    variables: [
        { name: 'user', value: 'user', type: 'object', defaultValue: null },
        { name: 'isAuthenticated', value: 'isAuthenticated', type: 'boolean', defaultValue: false },
    ],
    actions: [
        {
            name: 'Sign Up',
            code: 'signUp',
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
        },
    ],
};
