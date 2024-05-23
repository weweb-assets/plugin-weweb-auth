import { CognitoUserPool, CognitoUser, AuthenticationDetails, CookieStorage } from 'amazon-cognito-identity-js';
/* wwEditor:start */
import './components/Configuration/SettingsEdit.vue';
import './components/Configuration/SettingsSummary.vue';
import './components/Functions/Login.vue';
import './components/Functions/SignUp.vue';
import './components/Functions/UpdateUserProfile.vue';
import './components/Functions/ChangePassword.vue';
import './components/Functions/ConfirmPassword.vue';
import './components/Functions/ForgotPassword.vue';
/* wwEditor:end */

export default {
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    websiteId: null,
    cognitoUserPool: null,
    cognitoUser: null,
    cognitoStorage: null,
    async _onLoad(settings) {
        this.websiteId = wwLib.wwWebsiteData.getInfo().id;
        this.cognitoStorage = new CookieStorage({
            domain: window.location.hostname,
            path: wwLib.manager ? `/${this.websiteId}` : '/',
        });
        this.cognitoUserPool = new CognitoUserPool({
            ClientId: settings.publicData.clientId,
            UserPoolId: settings.publicData.userPoolId,
            Storage: this.cognitoStorage,
        });
    },
    async _initAuth() {
        this.cognitoUser = this.cognitoUserPool.getCurrentUser();
        if (this.cognitoUser) await this.fetchUser();
    },
    /*=============================================m_ÔÔ_m=============================================\
        Auth API
    \================================================================================================*/
    /* wwEditor:start */
    /* Users */
    userAttributes: [
        { label: 'Picture', key: 'picture' },
        { label: 'Given name', key: 'given_name' },
        { label: 'Family name', key: 'family_name' },
        { label: 'Middle name', key: 'middle_name' },
        { label: 'Nickname', key: 'nickname' },
        { label: 'Profile URL', key: 'profile' },
        { label: 'Website URL', key: 'website' },
        { label: 'Gender', key: 'gender' },
        { label: 'Birthdate', key: 'birthdate' },
        { label: 'Zoneinfo', key: 'zoneinfo' },
        { label: 'Locale', key: 'locale' },
        { label: 'Address', key: 'address' },
        { label: 'Phone number', key: 'phone_number' },
    ],
    async _adminGetUsers() {
        const response = await wwAxios.get(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users`
        );

        return response.data;
    },
    async _adminCreateUser(data, isInvitation) {
        try {
            const { data: user } = await wwAxios.post(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users`,
                { ...data, isInvitation }
            );
            return user;
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async _adminUpdateUser(user, data) {
        try {
            const { data: userUpdated } = await wwAxios.patch(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users/${user.id}`,
                data
            );
            return userUpdated;
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async _adminUpdateUserPassword(user, password) {
        try {
            await wwAxios.patch(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users/${user.id}/password`,
                { password }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async _adminUpdateUserRoles(user, roles) {
        try {
            await wwAxios.put(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users/${user.id}/roles`,
                { roles }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async _adminBlockUser(user) {
        try {
            await wwAxios.delete(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users/${user.id}/block`
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async _adminUnblockUser(user) {
        try {
            await wwAxios.delete(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users/${user.id}/unblock`
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async _adminDeleteUser(user) {
        try {
            await wwAxios.delete(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users/${user.id}`
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async _adminImportUsers(users, isInvitation) {
        for (const user of users) {
            try {
                await this.adminCreateUser(
                    { email: user.email, name: user.name, password: user.password, attributes: [] },
                    isInvitation
                );
            } catch (err) {
                wwLib.wwLog.error(err);
                wwLib.wwNotification.open({ text: err.message, color: 'red' });
            }
        }
    },
    _adminExportUsers(users) {
        const titles = [...new Set(users.map(user => Object.keys(user)).flat())];
        return [titles, ...users.map(user => titles.map(title => { 
            if(title === 'roles' && user[title] && user[title].length){
                return user[title].map(role => role.name).join(',')
            }
            return `${user[title]}`;
        }))];
    },
    /* Roles */
    async _adminGetRoles() {
        const { data } = await wwAxios.get(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/roles`
        );

        return data;
    },
    async _adminCreateRole(name) {
        const { data } = await wwAxios.post(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/roles`,
            { name }
        );

        return data;
    },
    async _adminUpdateRole(roleId, name) {
        const { data } = await wwAxios.patch(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/roles/${roleId}`,
            { name }
        );

        return data;
    },
    async _adminDeleteRole(roleId) {
        await wwAxios.delete(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/roles/${roleId}`
        );
    },
    /* wwEditor:end */
    /*=============================================m_ÔÔ_m=============================================\
        WeWeb Auth API
    \================================================================================================*/
    async fetchUser() {
        try {
            const accessToken = await new Promise((resolve, reject) =>
                this.cognitoUser.getSession((err, data) => (err ? reject(err) : resolve(data.accessToken.jwtToken)))
            );
            const awsUser = await new Promise((resolve, reject) =>
                this.cognitoUser.getUserData((err, data) => (err ? reject(err) : resolve(data)))
            );
            const { data: roles } = await axios.get(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users/${
                    awsUser.Username
                }/roles`,
                { headers: { 'ww-auth-access-token': accessToken } }
            );

            const user = {
                ...awsUser.UserAttributes.reduce(
                    (obj, attribute) => ({ ...obj, [attribute.Name]: attribute.Value }),
                    {}
                ),
                id: awsUser.Username,
                roles,
            };
            delete user.sub;

            wwLib.wwVariable.updateValue(`${this.id}-user`, user);
            wwLib.wwVariable.updateValue(`${this.id}-isAuthenticated`, true);
            return user;
        } catch (err) {
            this.logout();
            throw err;
        }
    },
    async login({ email, password }) {
        try {
            if (this.cognitoUser) this.logout();
            this.cognitoUser = new CognitoUser({
                Username: email,
                Pool: this.cognitoUserPool,
                Storage: this.cognitoStorage,
            });

            await new Promise((resolve, reject) =>
                this.cognitoUser.authenticateUser(new AuthenticationDetails({ Username: email, Password: password }), {
                    onSuccess: data => resolve(data),
                    onFailure: err => reject(err),
                })
            );
            return await this.fetchUser();
        } catch (err) {
            this.logout();
            throw err;
        }
    },
    async signUp({ email, password, name }) {
        try {
            await new Promise((resolve, reject) =>
                this.cognitoUserPool.signUp(email, password, [{ Name: 'name', Value: name }], null, (err, data) =>
                    err ? reject(err) : resolve(data)
                )
            );
            return await this.login({ email, password });
        } catch (err) {
            this.logout();
            throw err;
        }
    },
    async updateUserProfile({ email, name, attributes }) {
        if (!email) throw new Error('Failed to update user. Email cannot be empty.')
        try {
            await new Promise((resolve, reject) =>
                this.cognitoUser.updateAttributes(
                    [
                        { Name: 'email', Value: email || '' },
                        { Name: 'name', Value: name || '' },
                        ...(attributes || []).map(attribute => ({ Name: attribute.key, Value: attribute.value || '' })),
                    ],
                    (err, data) => (err ? reject(err) : resolve(data))
                )
            );
            return await this.fetchUser();
        } catch (err) {
            this.logout();
            throw err;
        }
    },
    async changePassword({ oldPassword, newPassword }) {
        try {
            await new Promise((resolve, reject) =>
                this.cognitoUser.changePassword(oldPassword, newPassword, (err, data) =>
                    err ? reject(err) : resolve(data)
                )
            );
        } catch (err) {
            this.logout();
            throw err;
        }
    },
    async forgotPassword({ email }) {
        this.cognitoUser = new CognitoUser({
            Username: email,
            Pool: this.cognitoUserPool,
            Storage: this.cognitoStorage,
        });
        await new Promise((resolve, reject) =>
            this.cognitoUser.forgotPassword({
                onSuccess: data => resolve(data),
                onFailure: err => reject(err),
                inputVerificationCode: data => resolve(data),
            })
        );
    },
    async confirmPassword({ verificationCode, newPassword }) {
        await new Promise((resolve, reject) =>
            this.cognitoUser.confirmPassword(verificationCode, newPassword, {
                onSuccess: () => resolve(),
                onFailure: err => reject(err),
            })
        );
    },
    logout() {
        wwLib.wwVariable.updateValue(`${this.id}-user`, null);
        wwLib.wwVariable.updateValue(`${this.id}-isAuthenticated`, false);
        if (this.cognitoUser) this.cognitoUser.signOut();
    },
};
