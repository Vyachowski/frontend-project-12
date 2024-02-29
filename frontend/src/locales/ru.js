export default {
  translation: {
    page404: {
      info: 'Страница не найдена',
      redirect: 'Но вы можете перейти',
      linkRedirect: 'на главную страницу',
    },
    mainPage: {
      redirect: 'Перенаправляем на страницу входа...',
    },
    loginPage: {
      title: 'Войти',
      usernameFieldLabel: 'Имя пользователя',
      passwordFieldLabel: 'Пароль',
      submitButton: 'Войти',
      noAccountMessage: 'Нет аккаунта? ',
      noAccountLink: 'Регистрация',
      overlay: 'Неверные имя пользователя или пароль',
    },
    signupPage: {
      title: 'Регистрация',
      validationErrors: {
        common: {
          required: 'Обязательное поле',
        },
        username: {
          minChar: 'От 3 до 20 символов',
          maxChar: 'От 3 до 20 символов',
        },
        password: {
          minChar: 'От 6 символов',
        },
        passwordConfirmation: {
          equalToPassword: 'Пароли должны совпадать',
        },
      },
      labels: {
        usernameFieldLabel: 'Имя пользователя',
        passwordFieldLabel: 'Пароль',
        passwordConfirmationFieldLabel: 'Подтверждение пароля',
      },
    },
    components: {
      header: {
        logoutButton: 'Выйти',
      },
      addChannelForm: {
        title: 'Название канала',
        validationsError: {
          required: 'Обязательное поле',
          minChar: 'От 3 до 20 символов',
          maxChar: 'От 3 до 20 символов',
          uniqueName: 'Имя канала должно быть уникальным',
        },
        cancelButton: 'Отменить',
        submitButton: 'Отправить',
      },
      channels: {
        title: 'Каналы',
        addButton: 'Добавить канал',
        dropdown: {
          renameButton: 'Переименовать',
          removeButton: 'Удалить',
        },
        modal: {
          titles: {
            addChannel: 'Добавить канал',
            renameChannel: 'Переименовать канал',
            removeChannel: 'Удалить канал',
          },
        },
      },
      messages: {
        counter_one: '{{count}} сообщение',
        counter_few: '{{count}} сообщения',
        counter_many: '{{count}} сообщений',
      },
      messagePanel: {
        label: 'Новое сообщение',
        placeholder: 'Введите сообщение...',
        submitButton: 'Отправить',
      },
      removeChannelForm: {
        title: 'Уверены?',
        cancelButton: 'Отменить',
        submitButton: 'Подтвердить',
      },
      renameChannelForm: {
        title: 'Переименовать канал',
        cancelButton: 'Отменить',
        submitButton: 'Переименовать',
        validationErrors: {
          required: 'Обязательное поле',
          minChar: 'От 3 до 20 символов',
          maxChar: 'От 3 до 20 символов',
          uniqueName: 'Имя канала должно быть уникальным',
        },
      },
    },
  },
};
