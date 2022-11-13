
//const LoadContext = React.createContext({ updateLoading: (type: boolean) => {} });

let _loading = false;

export function g_setLoading(loading: boolean){
  _loading = loading;
}

export function isLoading(){
  return _loading;
}