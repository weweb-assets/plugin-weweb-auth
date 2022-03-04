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
    async getUsers() {
        const websiteId = wwLib.wwWebsiteData.getInfo().id;
        const response = await axios.get(`${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users`, {
            headers: wwLib.wwApiRequests._getAuthHeader(),
        });

        return response.data;
    },
    async updateUser(user) {
        const websiteId = wwLib.wwWebsiteData.getInfo().id;
        await axios.patch(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users/${user.username}`,
            {},
            { headers: wwLib.wwApiRequests._getAuthHeader() }
        );
    },
    async blockUser(user) {
        const websiteId = wwLib.wwWebsiteData.getInfo().id;
        await axios.delete(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users/${user.username}/block`,
            { headers: wwLib.wwApiRequests._getAuthHeader() }
        );
    },
    async unblockUser(user) {
        const websiteId = wwLib.wwWebsiteData.getInfo().id;
        await axios.delete(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users/${user.username}/unblock`,
            { headers: wwLib.wwApiRequests._getAuthHeader() }
        );
    },
    async deleteUser(user) {
        const websiteId = wwLib.wwWebsiteData.getInfo().id;
        await axios.delete(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users/${user.username}`,
            { headers: wwLib.wwApiRequests._getAuthHeader() }
        );
    },
    /* wwEditor:end */
    /*=============================================m_ÔÔ_m=============================================\
        WeWeb Auth API
    \================================================================================================*/
};
