// Сохранения cookies на протяжении 24 дней
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 24;

// Название группы у студентов у которых отсутсвует группа
export const STUDENT_WITHOUT_GROUP = 'без группы';

// SOCKET
export const NEW_COMMENT = 'new_comment';
export const SOCKET_ACTION_REFRESH = 'refresh';
export const SOCKET_ACTION_REDIRECT = 'redirect';

export type SOCKET_ACTIONS =
	| typeof SOCKET_ACTION_REFRESH
	| typeof SOCKET_ACTION_REDIRECT;
