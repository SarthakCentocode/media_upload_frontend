export interface ColumnsInterface {
  field: string;
  headerName: string;
  width?: number;
  flex?: number;
  editable: boolean;
  valueGetter?: (params: any) => string | number | boolean;
  renderCell?: (params: any) => void;
}
