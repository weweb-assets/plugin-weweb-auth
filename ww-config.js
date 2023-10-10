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
            getIsValid({ email, password }) {
                return !!email && !!password;
            },
            aiDescription: {
                description: 'Sign up the user with login and password.',
                return: 'null',
                syntax: `{
                    "args": {
                        "email": "{{email of the user as string or ACTION_VALUE}}",
                        "name": "{{name of the user as string or ACTION_VALUE}}",
                        "password": "{{password of the user as string or ACTION_VALUE}}",
                    }
                    
                }`,
            },
            /* wwEditor:end */
        },
        {
            name: 'Login',
            code: 'login',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Login.vue'),
            getIsValid({ email, password }) {
                return !!email && !!password;
            },
            aiDescription: {
                description: 'Log in the user with login and password.',
                return: 'null',
                syntax: `{
                    "args": {
                        "email": "{{email of the user as string or ACTION_VALUE}}",
                        "password": "{{password of the user as string or ACTION_VALUE}}",
                    }
                    
                }`,
            },
            /* wwEditor:end */
        },
        {
            name: 'Update User Profile',
            code: 'updateUserProfile',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/UpdateUserProfile.vue'),
            getIsValid({ email }) {
                return !!email;
            },
            aiDescription: {
                description: 'Update the user\'s name, email and custom attributes.',
                return: 'null',
                syntax: `{
                    "args": {
                        "email": "{{email of the user as string or ACTION_VALUE}}",
                        "password": "{{password of the user as string or ACTION_VALUE}}",
                        "attributes": [{{custom attributes of the user as array of objects or ACTION_VALUE in the format: { "key": "attribute key", "value": "attribute value", type: "string" } }}]
                    }
                    
                }`,
            },
            /* wwEditor:end */
        },
        {
            name: 'Change Password',
            code: 'changePassword',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/ChangePassword.vue'),
            getIsValid({ oldPassword, newPassword }) {
                return !!oldPassword && !!newPassword;
            },
            aiDescription: {
                description: 'Update the user\'s password by provinding the old password and the new password.',
                return: 'null',
                syntax: `{
                    "args": {
                        "oldPassword": "{{old password of the user as string or ACTION_VALUE}}",
                        "newPassword": "{{new password of the user as string or ACTION_VALUE}}",
                    }
                    
                }`,
            },
            /* wwEditor:end */
        },
        {
            name: 'Forgot Password',
            code: 'forgotPassword',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/ForgotPassword.vue'),
            getIsValid({ email }) {
                return email;
            },
            aiDescription: {
                description: 'Send an email to the user using it\'s email.',
                return: 'null',
                syntax: `{
                    "args": {
                        "email": "{{email of the user as string or ACTION_VALUE}}",
                    }
                    
                }`,
            },
            /* wwEditor:end */
        },
        {
            name: 'Confirm Password',
            code: 'confirmPassword',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/ConfirmPassword.vue'),
            getIsValid({ verificationCode, newPassword }) {
                return !!verificationCode && !!newPassword;
            },
            aiDescription: {
                description: 'Confirm user\'s new password using a verification code.',
                return: 'null',
                syntax: `{
                    "args": {
                        "newPassword": "{{new password of the user as string or ACTION_VALUE}}",
                        "verificationCode": "{{verification code as string or ACTION_VALUE}}",
                    }
                    
                }`,
            },
            /* wwEditor:end */
        },
        {
            name: 'Logout',
            code: 'logout',
            aiDescription: {
                description: 'Logout user.',
                return: 'null',
                syntax: `{                    
                }`,
            },
        },
    ],
};
