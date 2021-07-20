// Получаем с сервера
export interface FbResponce {
  name: string;
}

// Отправляем на сервер
export interface Product {
  id?: string;
  type?: string;
  title?: string;
  photo?: string;
  info?: string;
  price?: number;
  date?: Date;
}



