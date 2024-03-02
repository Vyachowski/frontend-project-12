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
      submitButton: 'Войти',
      labels: {
        usernameFieldLabel: 'Ваш ник',
        passwordFieldLabel: 'Пароль',
      },
      noAccountMessage: 'Нет аккаунта? ',
      noAccountLink: 'Регистрация',
      overlay: 'Неверные имя пользователя или пароль',
    },
    signupPage: {
      title: 'Регистрация',
      submitButton: 'Зарегистрироваться',
      labels: {
        usernameField: 'Ваш ник',
        passwordField: 'Пароль',
        passwordConfirmationField: 'Подтверждение пароля',
      },
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
      submitErrors: {
        409: 'Такой пользователь уже существует',
      },
    },
    components: {
      header: {
        logoutButton: 'Выйти',
      },
      channels: {
        title: 'Каналы',
        addButton: '+',
        dropdown: {
          title: 'Управление каналом',
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
        request: {
          success: 'Канал создан',
          networkError: 'Ошибка соединения',
        },
      },
      removeChannelForm: {
        title: 'Уверены?',
        cancelButton: 'Отменить',
        submitButton: 'Подтвердить',
        request: {
          success: 'Канал удалён',
          networkError: 'Ошибка соединения',
        },
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
        request: {
          success: 'Канал переименован',
          networkError: 'Ошибка соединения',
        },
      },
    },
  },
};
