import AddressComponent from './address/Address';
import GovPilotAddressComponent from './gpaddress/GovPilotAddress';
import ButtonComponent from './button/Button';
import PayButtonComponent from './gppaybutton/PayButton';
import CheckBoxComponent from './checkbox/Checkbox';
import ColumnsComponent from './columns/Columns';
import Component from './_classes/component/Component';
import ComponentModal from './_classes/componentModal/ComponentModal';
import ContainerComponent from './container/Container';
import ContentComponent from './content/Content';
import CurrencyComponent from './currency/Currency';
import DataGridComponent from './datagrid/DataGrid';
import DataMapComponent from './datamap/DataMap';
import DateTimeComponent from './datetime/DateTime';
import DayComponent from './day/Day';
import EditGridComponent from './editgrid/EditGrid';
import GovPilotGridComponent from './gpgrid/GovPilotGrid';
import EmailComponent from './email/Email';
import FieldsetComponent from './fieldset/Fieldset';
import FileComponent from './file/File';
import PictureComponent from './picture/Picture';
import FormComponent from './form/Form';
import HiddenComponent from './hidden/Hidden';
import Input from './_classes/input/Input';
import Multivalue from './_classes/multivalue/Multivalue';
import Field from './_classes/field/Field';
import HTMLComponent from './html/HTML';
import LabelComponent from './gplabel/Label';
import LineComponent from './gpline/Line';
import MeasureComponent from './gpmeasure/Measure';
import LocationComponent from './location/Location';
import NestedComponent from './_classes/nested/NestedComponent';
import NestedDataComponent from './_classes/nesteddata/NestedDataComponent';
import NestedArrayComponent from './_classes/nestedarray/NestedArrayComponent';
import NumberComponent from './number/Number';
import PanelComponent from './panel/Panel';
import PasswordComponent from './password/Password';
import PhoneNumberComponent from './phonenumber/PhoneNumber';
import RadioComponent from './radio/Radio';
import ReCaptchaComponent from './recaptcha/ReCaptcha';
import ResourceComponent from './resource/Resource';
import SchedulerComponent from './gpscheduler/Scheduler';
import SelectBoxesComponent from './selectboxes/SelectBoxes';
import SelectComponent from './select/Select';
import SignatureComponent from './signature/Signature';
import SerialNumberComponent from './serialnumber/SerialNumber';
import SurveyComponent from './survey/Survey';
import TableComponent from './table/Table';
import TabsComponent from './tabs/Tabs';
import TagsComponent from './tags/Tags';
import TextAreaComponent from './textarea/TextArea';
import TextFieldComponent from './textfield/TextField';
import TimeComponent from './time/Time';
import TreeComponent from './tree/Tree';
import UnknownComponent from './unknown/Unknown';
import UrlComponent from './url/Url';
import WellComponent from './well/Well';

export default {
  address: AddressComponent,
  gpaddress: GovPilotAddressComponent,
  base: Component,
  component: Component,
  componentmodal: ComponentModal,
  button: ButtonComponent,
  gppaybutton: PayButtonComponent,
  checkbox: CheckBoxComponent,
  columns: ColumnsComponent,
  container: ContainerComponent,
  content: ContentComponent,
  currency: CurrencyComponent,
  datagrid: DataGridComponent,
  datamap: DataMapComponent,
  datetime: DateTimeComponent,
  day: DayComponent,
  editgrid: EditGridComponent,
  gpgrid: GovPilotGridComponent,
  email: EmailComponent,
  input: Input,
  field: Field,
  multivalue: Multivalue,
  fieldset: FieldsetComponent,
  file: FileComponent,
  picture: PictureComponent,
  form: FormComponent,
  hidden: HiddenComponent,
  htmlelement: HTMLComponent,
  gplabel: LabelComponent,
  gpline: LineComponent,
  gpmeasure: MeasureComponent,
  location: LocationComponent,
  nested: NestedComponent,
  nesteddata: NestedDataComponent,
  nestedarray: NestedArrayComponent,
  number: NumberComponent,
  panel: PanelComponent,
  password: PasswordComponent,
  phoneNumber: PhoneNumberComponent,
  radio: RadioComponent,
  recaptcha: ReCaptchaComponent,
  resource: ResourceComponent,
  scheduler: SchedulerComponent,
  select: SelectComponent,
  selectboxes: SelectBoxesComponent,
  serialnumber: SerialNumberComponent,
  signature: SignatureComponent,
  survey: SurveyComponent,
  table: TableComponent,
  tabs: TabsComponent,
  tags: TagsComponent,
  textarea: TextAreaComponent,
  textfield: TextFieldComponent,
  time: TimeComponent,
  tree: TreeComponent,
  unknown: UnknownComponent,
  url: UrlComponent,
  well: WellComponent,
};
