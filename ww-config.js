export default {
    editor: {
        settings: [
            {
                label: 'Configuration',
                icon: 'advanced',
                edit: () => import('./src/components/Configuration/SettingsEdit.vue'),
                summary: () => import('./src/components/Configuration/SettingsSummary.vue'),
                getIsValid(settings) {
                    const { userEndpoint, type } = settings.publicData;
                    return !!userEndpoint && !!type;
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
        // designSystemId: 'ec2eebfe-499b-43c4-b260-80ee5a4d9504',
    },
    variables: [
        { name: 'user', value: 'user', type: 'object', defaultValue: null },
        { name: 'accessToken', value: 'accessToken', type: 'string', defaultValue: null },
        { name: 'isAuthenticated', value: 'isAuthenticated', type: 'boolean', defaultValue: false },
    ],
    functions: [
        {
            name: 'Logout',
            code: 'logout',
            parameters: [],
        },
    ],
};
