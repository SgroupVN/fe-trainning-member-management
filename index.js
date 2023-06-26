const app = new Vue({
    el: "#app",
    data: {
        q: '',
        tableColumns: [
            "user",
            "role",
            "status",
            "last activity",
            "join date",
            "actions",
        ],
        userData: [
            {
                id: '1',
                name: "John Doe",
                email: "johnDoe@gmail.com",
                avatar: "https://i.pravatar.cc/300",
                role: "admin",
                status: "active",
                lastActivity: "1 min ago",
                joinDate: "2023-06-16T02:56:02.677Z",
            },
            {
                id: '2',
                name: "John User",
                email: "johnDoe@gmail.com",
                avatar: "https://i.pravatar.cc/300",
                role: "user",
                status: "suspended",
                lastActivity: "1 min ago",
                joinDate: "2023-06-16T02:56:02.677Z",
            },
            {
                id: '3',
                name: "John Admin",
                email: "johnDoe@gmail.com",
                avatar: "https://i.pravatar.cc/300",
                role: "admin",
                status: "active",
                lastActivity: "1 min ago",
                joinDate: "2023-06-16T02:56:02.677Z",
            },
        ],
        form: {
            isEdit: 1,
            title: 'Edit user',
            user: {
                name: '',
                email: '',
                avatar: 'https://i.pravatar.cc/300',
                role: '',
                status: ''
            }
        }
    },
    computed: {
        filteredUser() {
            if (!this.q) return this.userData
            return this.userData.filter(u => {
                for (latroi in u) {
                    const value = u[latroi]
                    if (typeof value !== 'string') continue
                    if (value.toLowerCase().includes(this.q.toLowerCase())) return true
                }
            })
        }
    },
    methods: {
        closeAllPopup() {
            var popups = document.querySelectorAll('td.relative > div');
            popups.forEach(p => p.style.display = "none");
        },
        autoClosePopup(e){
            if (e.target.classList.contains('popup')) return;
            this.closeAllPopup()
        },
        showPopup(id) {
            this.closeAllPopup()
            var popup = document.querySelector("#action-" + id)
            if (popup.dataset.display == "none") {
                popup.style.display = "block"
                popup.dataset.display = "block"
            } else {
                popup.style.display = "none"
                popup.dataset.display = "none"
            }
        },
        onDelete(id) {
            this.filterUser(id);
            this.closeAllPopup();
        },
        filterUser(id) {
            this.userData = this.userData.filter(u => u.id !== id)
        }
    },
});
