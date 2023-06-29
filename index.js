const { createApp } = Vue

createApp({
    data() {
        return {
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            user: {
                name: {
                    label: 'name',
                    value: 'Test name',
                },
                email: {
                    label: 'email',
                    value: 'email@gmail.com'
                },
                city: {
                    label: 'city',
                    value: 'Da Nang',
                    type: 'select'
                },
                major: {
                    label: 'Major',
                    value: ['IT'],
                    type: 'checkbox'
                },
            },
            cities: [
                'Da Nang',
                'HCM',
                'HN'
            ],
            majors: [
                'IT',
                'DS',
                'MO'
            ]
        }
    },
    methods: {
        isValid(type) {
            switch (type) {
                case 'name':
                    return !this.isNameValid()
                case 'email':
                    return !this.isEmailValid()
                default:
                    return false
            }
        },
        isNameValid() {
            return this.user.name.value
        },
        isEmailValid() {
            return (this.user.email.value && this.reg.test(this.user.email.value))
        },
        openFileInput() {
            document.querySelector('input#file').click()
        },
        submit() {
            if (!(this.isEmailValid() && this.isNameValid())) return;
            const body = {
                name: this.user.name.value,
                email: this.user.email.value
            }
            alert(JSON.stringify(body))
        }
    }
}).mount("#app");
