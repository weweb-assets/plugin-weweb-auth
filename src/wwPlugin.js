/* wwEditor:start */
import './components/Configuration/SettingsEdit.vue';
import './components/Configuration/SettingsSummary.vue';
import './components/Redirections/SettingsEdit.vue';
import './components/Redirections/SettingsSummary.vue';
/* wwEditor:end */

export default {
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    async onLoad() {},
    /*=============================================m_ÔÔ_m=============================================\
        Auth API
    \================================================================================================*/
    /* wwEditor:start */
    // async getRoles() {},
    userAttributes: [
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
    async getUsers() {
        const websiteId = wwLib.wwWebsiteData.getInfo().id;
        const response = await axios.get(`${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users`, {
            headers: wwLib.wwApiRequests._getAuthHeader(),
        });

        return response.data;
    },
    async importUsers(users) {
        for (const user of users) {
            await this.createUser(user);
        }
    },
    async createUser(data) {
        try {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;
            await axios.post(`${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users`, data, {
                headers: wwLib.wwApiRequests._getAuthHeader(),
            });
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async updateUser(user, data) {
        try {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;
            await axios.patch(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users/${user.id}`,
                data,
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async resetUserPassword(user) {
        try {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;
            await axios.patch(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users/${user.id}/password/reset`,
                {},
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async blockUser(user) {
        try {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;
            await axios.delete(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users/${user.id}/block`,
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async unblockUser(user) {
        try {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;
            await axios.delete(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users/${user.id}/unblock`,
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async deleteUser(user) {
        try {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;
            await axios.delete(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users/${user.id}`,
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    /* wwEditor:end */
    /*=============================================m_ÔÔ_m=============================================\
        WeWeb Auth API
    \================================================================================================*/
};
