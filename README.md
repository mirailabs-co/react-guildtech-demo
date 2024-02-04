# Ant Design

## Grid

- Col must inside Row
- gap: 24 (responsive: xs, sm, md, lg, xl, xxl)
- pull and push: change collumn order (inset-inline-end)
- justify: start, center, end, space-between, space-around, space-evenly
- align: top, middle, bottom
- flex, grap
- order: using to sort collumn
- gutter (~ using padding collumn): value or object (for responsive)
- offset: shifted to the right
- responsive: span, pull, push, offset, order (ex: xs={{span: 6}})

## Breakpoint (>=)

- xs: 480px,
- sm: 576px,
- md: 768px,
- lg: 992px,
- xl: 1200px,
- xxl: 1600px,

https://github.com/ant-design/ant-design/pull/39105

## Form

- watch từng field: Form.useWatch('name', form);
- onFinish
- onFinishFailed
- validateTrigger: validateTrigger="onBlur"
- validate Debounce
- useForm: getFieldError, getFieldsError, getFieldValue, getFieldsValue, setFieldValue, setFieldsValue, isFieldsTouched
- form.setFields([ {
  name: 'field-to-update',
  errors: ['error-string'],
  },]);
  support ts kém
- size

#Form.List
Note: You should not configure Form.Item initialValue under Form.List. It always should be configured by Form.List initialValue or Form initialValues.

## Customize theme

Seed Token: modify Design Token globally, Seed Token có nghĩa là nguồn gốc của mọi ý định thiết kế. Ví dụ: chúng ta có thể thay đổi màu theme bằng cách thay đổi colorPrimary, thuật toán bên trong antd sẽ tự động tính toán và áp dụng dãy màu tương ứng theo Seed Token
Alias Token: Định nghĩa màu nền cho một container (colorBgContainer).

Các chủ đề với các phong cách khác nhau có thể được tạo nhanh chóng bằng cách sửa đổi algorithm.
3 theme provides:

- default algorithm theme.defaultAlgorithm
- dark algorithm theme.darkAlgorithm
- compact algorithm theme.compactAlgorithm

#custom component token

- algorithm: By default, all component tokens can only override global token and will not be derived based on Seed Token.
  In version >= 5.8.0, component tokens support the algorithm property, which can be used to enable algorithm or pass in other algorithms.
  #Extends Theme
  <ConfigProvider
  button={{ className: 'my-button' }}
  checkbox={{ className: 'my-checkbox' }}
  divider={{ className: 'my-divider' }}
  />
  https://ant.design/theme-editor

ConfigProvider supports the className and style configurations of all components

## antd/cssinjs

@ant-design/css-in-js không phải là một thư viện CSS-in-JS riêng lẻ, nó là một phần của Ant Design. dùng emotion nếu muốn style theo cssinjs

- useServerInsertedHTML từ "next/navigation": Có vẻ như đây là một phương thức được sử dụng trong Next.js để xử lý việc chèn HTML từ server.
- Sử dụng useMemo để tạo một cache để lưu trữ các style.
- Sử dụng useRef để theo dõi việc đã chèn HTML từ server hay chưa, từ đó tránh chèn trùng lặp.
- createCache(): Phương thức này tạo một cache để lưu trữ các style.
- hashPriority="high": remove':where'(dùng để giảm độ ưu tiên)> kém trên các trình duyệt cũ hoặc xung đột ưu tiên như tailwind): vô hiệu hóa việc giảm độ ưu tiên mặc định -legacyLogicalPropertiesTransformer: cần tương thích với các trình duyệt cũ hơn (the original margin-left is replaced by margin-inline-start) - px2remTransformer: chuyển đổi pixel qua rem

## Emotion

@emotion/styled

- @emotion/styled lấy cảm hứng nhiều từ styled-components
- component style thiên về cú pháp tạo kiểu giống CSS truyền thống hơn.
- có thể truyền props
- Styling any component: có thể tạo kiểu cho bất kỳ thành phần nào miễn là nó chấp nhận prop className.
- Change the rendered tag using withComponent: tái sử dụng kiểu với component khác
- Targeting another emotion component
- Customizing prop forwarding: to prevent styling props được truyền xuống và tạo thuộc tính invalid:
  const H1 = styled('h1', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'color'
  })(props => ({
  color: props.color
  }))
- as prop: dùng để styles từ 1 styled component nhưng thay đổi element rendered

@media (min-width: 420px) {
font-size: 50px;
}
<Button as="a" href="https://github.com/emotion-js/emotion">
Emotion on GitHub
</Button>

- Nesting components: nest selectors using &:
  https://emotion.sh/docs/styled
