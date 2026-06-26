# Câu Hỏi Bổ Sung Cho Memberships & Subscriptions Add-on for LearnPress

## Hướng Dẫn Trả Lời

Hãy trả lời trực tiếp dưới từng câu hỏi ở dòng `Trả lời:`. Bạn có thể bỏ qua câu không liên quan, ghi `Không biết` nếu chưa có dữ liệu, hoặc ghi `Quyết định sau` nếu cần team thảo luận thêm. Ưu tiên trả lời phần `Câu Hỏi Ưu Tiên Cao` trước để có đủ dữ liệu tạo Product Discovery, Product Documentation, UX/Wireframe, QA, SEO và Marketing Package.

## Tóm Tắt Những Gì Đã Biết

Sản phẩm là `Memberships & Subscriptions Add-on for LearnPress`, một add-on WordPress/LearnPress hiện đã có plan/member model, bảng riêng, course-plan mapping, checkout item type ẩn `lp_membership`, lifecycle activation theo LP order, cron expire/reminder, profile tab và pricing block/shortcode.

Mục tiêu nâng cấp là biến add-on này thành membership platform đầy đủ hơn bằng 2 module chính: `Membership Restriction Engine` và `WooCommerce Membership Purchase Integration`. Restriction Engine cần cho phép admin giới hạn post/page/course/lesson/quiz/custom post type theo membership plan, có rule model, mode ẩn nội dung, ẩn khỏi listing/query hoặc redirect, message/CTA, block/shortcode member-only và helper API. WooCommerce integration cần cho phép mua membership plan qua Woo cart/checkout/gateway bằng cách tận dụng `learnpress-woo-payment`, tạo hoặc đồng bộ LP order item type `lp_membership`, kích hoạt hoặc thu hồi membership theo trạng thái Woo order và có khả năng mở rộng sang Woo Subscriptions.

Người dùng chính gồm website admin, LMS owner, education business, instructor, student/customer, guest và developer/customizer. Đối thủ hoặc giải pháp thay thế đã nêu gồm WooCommerce Memberships, Paid Memberships Pro, MemberPress, Restrict Content Pro, WooCommerce Subscriptions, LearnPress Woo Payment bán course riêng lẻ và workflow thủ công enroll user sau khi mua Woo product.

Rủi ro lớn hiện tại gồm quyết định kiến trúc `lp_membership` shadow post hay WC product class riêng, tương thích 2 mode của `learnpress-woo-payment`, mapping total/subtotal cho item type mới, lifecycle lifetime/subscription/refund/cancel, guest checkout, query restriction performance, không copy code từ WooCommerce Memberships và cần migration DB mới.

## Các Assumption Đang Có

1. Khách hàng LearnPress hiện có nhu cầu thực tế muốn bán membership theo plan thay vì chỉ bán từng course.

Trả lời: chính xác, và module bán membership đã có ở bản 4.0.0 rồi

2. Khách hàng muốn dùng WooCommerce checkout cho membership vì đã dùng Woo gateways, coupon, tax, invoice hoặc Woo Subscriptions.

Trả lời: chính xác, tận dụng các lợi thế thanh toán của woocommerce

3. MVP cần có cả Restrict Content và WooCommerce Membership Checkout, thay vì tách thành 2 release độc lập.

Trả lời: 2 release độc lập, checkout trước, restrict content phase sau

4. Admin là người chính tạo restriction rules, nhưng có thể instructor hoặc manager cũng cần quyền cấu hình trong một số site.

Trả lời: chỉ riêng admin thôi nhé

5. Rule model riêng trong plugin là hướng ưu tiên hơn so với phụ thuộc vào WooCommerce Memberships.

Trả lời: đúng rồi, và không liên quan đến woo membership chứ, mình cần làm tính năng cho mình, k cần để ý đến woo membership

6. `PlanHelper::get_user_active_plans()` sẽ là source of truth cho quyền truy cập content.

Trả lời: đừng đề cập đến kỹ thuật, việc tạo hàm thế nào, tên hàm là gì sẽ do bên backend họ lo

7. Guest checkout sẽ bị chặn hoặc buộc tạo/login user trước khi activate membership.

Trả lời: chính xác

8. Woo Subscriptions là optional integration, không phải dependency bắt buộc cho phase đầu.

Trả lời: khả năng là sẽ phải bắt buộc, cần có nó mới thanh toán subcription được

9. Product sẽ được bán như paid add-on hoặc bundled trong LearnPress Pro Bundle.

Trả lời: không liên quan, nó là 1 addon độc lập, paid addons

10. SEO và product page sẽ nhắm đến nhóm keyword `learnpress membership`, `learnpress restrict content`, và `learnpress woocommerce membership`.

Trả lời: ok

## Câu Hỏi Cần Trả Lời

### Product Context

1. Mục tiêu release gần nhất là gì: MVP nội bộ, beta cho khách hàng hiện tại, marketplace release, hay public stable release?

Trả lời:marketplace release

2. Sản phẩm này là nâng cấp của add-on hiện tại, SKU mới, hay module premium nằm trong LearnPress Pro Bundle?

Trả lời: nâng cấp của addon hiện tại, không liên quan gì đến learnpress pro bundle

3. Version hiện tại của `Memberships & Subscriptions Add-on for LearnPress` đang có bao nhiêu active sites, license, khách hàng trả phí hoặc ticket support liên quan đến membership?

Trả lời: không có thông tin, vì addon còn rất mới

4. Các version tối thiểu cần hỗ trợ là gì cho WordPress, PHP, LearnPress, WooCommerce, `learnpress-woo-payment` và Woo Subscriptions?

Trả lời: min wp 6.0, php 7.2, learnpress 4.0.0, woocommerce 6.0.0, learnpress-woo-payment 4.0.0, woo subscriptions 

5. Team muốn định vị sản phẩm là `LearnPress-native membership add-on`, `WooCommerce membership checkout for LearnPress`, hay `all-in-one membership solution for LearnPress`?

Trả lời: all-in-one membership solution for LearnPress

6. Thành công sau 3 tháng và 12 tháng sẽ được đo bằng chỉ số nào: license revenue, activation, conversion qua Woo checkout, số rule tạo ra, giảm support ticket, hay chỉ số khác?

Trả lời: license revenue

### Market Validation

7. Có bằng chứng cụ thể nào từ khách hàng hiện tại không: ticket, feature request, review, forum, email, sale call, survey hoặc lost deal liên quan đến restrict content hoặc Woo checkout?

Trả lời: không, tính năng này mình muốn làm, chứ k phải do nhu cầu thực tế

8. Trong 2 vấn đề chính, vấn đề nào đau hơn với khách hàng: thiếu restrict content linh hoạt hay thiếu WooCommerce checkout cho membership?

Trả lời: như nhau

9. Khách hàng hiện đang dùng workaround nào phổ biến nhất: WooCommerce Memberships, MemberPress, PMPro, custom code, manual enroll, hay bán từng course?

Trả lời: bán từng course

10. Có nhóm khách hàng cụ thể nào đã nói sẵn sàng trả tiền cho tính năng này không? Nếu có, họ thuộc phân khúc nào và ngân sách khoảng bao nhiêu?

Trả lời: không biết

11. Thị trường mục tiêu chính là global English-speaking market, Việt Nam, marketplace LearnPress hiện tại, agency/developer, hay education business lớn hơn?

Trả lời: global English-speaking market

12. Trước khi build full, team muốn validate bằng cách nào: landing page, survey user hiện tại, preorder, beta waitlist, demo prototype, hay phỏng vấn 5-10 khách hàng?

Trả lời: không validate

### Users & Roles

13. Admin cần toàn quyền cấu hình plan, member, restriction rule, Woo checkout và settings đúng không? Có quyền nào admin không nên có không?

Trả lời: toàn quyền

14. Manager có cần quản lý member/restriction rule không, hay chỉ xem report và support khách hàng?

Trả lời: chỉ xem và support

15. Instructor có được tạo restriction rule cho course/lesson của chính họ không, hay chỉ admin mới được cấu hình restriction?

Trả lời: only admin

16. Student và Customer được xem membership status ở đâu: LearnPress profile tab, Woo account page, email, course page CTA, hay tất cả?

Trả lời: LearnPress profile tab + Woo account page

17. Guest khi gặp content bị restricted sẽ thấy gì: login/register CTA, buy membership CTA, danh sách plan, redirect pricing page, hay ?

Trả lời: message tùy chỉnh

18. Developer/customizer cần hook/filter/API nào là bắt buộc trong v1 để mở rộng rule, message, access check, lifecycle hoặc Woo order mapping?

Trả lời: tạm thời bỏ các vấn đề liên quan đến developer

### Scope & Features

19. MVP v1 bắt buộc phải có cả Restrict Content và WooCommerce checkout không, hay nên release Restrict Content trước rồi Woo checkout sau?

Trả lời: woo trước restrict content sau

20. Những content type nào bắt buộc hỗ trợ ở v1: post, page, course, lesson, quiz, assignment, question, attachment, custom post type, taxonomy term, category/tag, course category?

Trả lời: post/page, course, lesson, quiz, question, và custom post type

21. Rule targeting cần hỗ trợ mức nào trong v1: toàn bộ post type, taxonomy term, từng object cụ thể, course hierarchy, hoặc rule theo author/instructor?

Trả lời: toàn bộ post type

22. Khi nhiều rule cùng áp vào một object, rule conflict sẽ xử lý thế nào: allow nếu user có một trong các plan, yêu cầu tất cả plan, rule ưu tiên cao nhất, hay deny luôn thắng?

Trả lời: allow nếu user có một trong các plan

23. `Restriction mode` nào là bắt buộc cho v1: hide content only, hide completely khỏi listing/query, redirect to page, hoặc custom template?

Trả lời: hide content only

24. Restricted message cần biến thể theo context nào: guest, logged-in non-member, expired member, cancelled/refunded member, wrong plan, hoặc pending payment?

Trả lời: guest, logged-in non-member, expired member, cancelled/refunded member, wrong plan, hoặc pending payment

25. CTA trong restricted message cần dẫn về đâu: pricing page, plan detail, Woo product/cart, LearnPress checkout, login/register, hay contact admin?

Trả lời:pricing page

26. Gutenberg block/shortcode member-only và non-member content cần hỗ trợ điều kiện nào: theo plan, theo member status, theo logged-in, theo course enrollment, hoặc theo expiry date?

Trả lời: không tạo shortcode cho gutenberg (tất cả sẽ config và check qua plan)

27. Drip/delayed access có nằm trong v1 không, hay để v1.1/v2? ()

Trả lời: để phase sau

28. Khi Woo order cancelled, failed, refunded hoặc chargeback, membership cần bị revoke ngay, chuyển suspended, đặt expired, hay giữ access đến cuối kỳ?

Trả lời: giữ access đến cuối kỳ?

29. Existing LP checkout flow hiện tại cần giữ nguyên 100% hay có thể thay đổi CTA/default checkout để ưu tiên WooCommerce?

Trả lời: nó sẽ tự chuyển sang woo checkout, k cần quan tâm

30. Có yêu cầu migration dữ liệu từ plan/course mapping hiện tại sang restriction rules mới không?

Trả lời: không

### Competitors

31. Đối thủ nào là benchmark quan trọng nhất cho sản phẩm này: WooCommerce Memberships, MemberPress, Paid Memberships Pro, Restrict Content Pro, hay plugin khác?

Trả lời:  WooCommerce Memberships, MemberPress, Paid Memberships Pro, Restrict Content Pro

32. Tính năng nào của WooCommerce Memberships nên học theo về UX/architecture, và tính năng nào không nên đưa vào vì scope quá rộng?

Trả lời: Restrict content

33. Có đối thủ nào khách hàng LearnPress đang chuyển sang thường xuyên không? Nếu có, lý do chính là feature, price, UX, support, hay Woo compatibility?

Trả lời: không biết

34. Team muốn cạnh tranh bằng giá rẻ hơn, LearnPress-native integration tốt hơn, Woo checkout tốt hơn, ít plugin dependency hơn, hay support tốt hơn?

Trả lời: giá rẻ hơn, LearnPress-native integration tốt hơn

35. Có thể dùng tên đối thủ trong SEO comparison/alternative pages không, hay cần tránh vì policy/brand/legal?

Trả lời: có thể dùng tên đối thủ trong SEO comparison/alternative pages

### Revenue & Pricing

36. Pricing model mong muốn là one-time license, annual subscription, lifetime deal, bundle-only, hay tier theo số site?

Trả lời: pricing vẫn thế, liên quan gì đến 2 tính năng mới thêm đâu

37. Có cần tách tier theo feature không: Restrict Content basic, Woo checkout, Woo Subscriptions lifecycle, developer API, priority support?

Trả lời:không

38. Sản phẩm có free/lite version không, hay chỉ paid add-on?

Trả lời: không có free

39. Woo Subscriptions integration nếu có sẽ nằm trong cùng license, higher tier, hay add-on riêng?

Trả lời:nằm cùng addon

40. Team có target price range hoặc benchmark pricing từ LearnPress add-ons hiện tại không?

Trả lời:  hiện tại addon này đang để giá 49$ discount 50% còn 29$, sau khi update tính năng nay sẽ tăng giá lên bằng với mức giảm discount 25%

41. Chính sách renew, update, support và refund cần đưa vào product page/FAQ là gì?

Trả lời: 1 năm update và support

### UX/User Flow

42. Admin flow ưu tiên là tạo plan trước rồi chọn content được bảo vệ, hay tạo restriction rule riêng rồi chọn plan/content?

Trả lời: tạo plan trước rồi chọn content được bảo vệ, logic rõ ràng, hiện tại đang có luồng chọn course cho plan, thêm 1 luồng nữa là restrict content, nếu để trống phần chọn course thì sẽ là restrict content)

43. Restriction UI nên nằm ở đâu: plan edit tab, menu `Restriction Rules`, metabox trên post/course edit, settings page, hay kết hợp nhiều vị trí?  

Trả lời: plan edit tab

44. Rule creation UX nên là form đơn giản, table rule builder, wizard theo bước, hay giống WooCommerce Memberships rules table?

Trả lời: table rule builder

45. Woo purchase CTA cần xuất hiện ở những nơi nào: pricing block, shortcode, course page, restricted message, profile renew button, email, hoặc plan archive?

Trả lời: pricing block, shortcode, course page, restricted message, profile renew button, email

46. Customer/student sau khi mua membership qua Woo cần được đưa tới đâu: Woo thank you page, LearnPress profile, course page, membership dashboard, hay custom success page?

Trả lời: membership dashboard

47. Profile tab cần hiển thị gì: current plan, start/end date, status, renewal link, cancelled/refunded reason, invoices/orders, accessible courses/content?

Trả lời: giữ nguyên logic đang hiển thị

48. Các error/empty states quan trọng cần wireframe là gì: chưa có plan, chưa có rule, WooCommerce inactive, `learnpress-woo-payment` inactive, missing user account, payment pending, access denied?

Trả lời: toàn bộ

49. Bạn có thể cung cấp ảnh màn hình hiện tại nào để vẽ wireframe chuẩn hơn: LearnPress membership plan edit, all plans table, member list/detail, settings, pricing block/shortcode, profile tab, course page CTA, LP checkout, Woo checkout, Woo order detail, `learnpress-woo-payment` settings, Woo product/course mapping?

Trả lời: toàn bộ, xem trong thư mục /images cùng cấp với file này

50. Có màn hình reference nào từ plugin khác bạn muốn dùng để tham khảo cấu trúc UX không? Chỉ cần dùng làm reference, không copy UI/code.

Trả lời: màn hình restrict content của woo membership, sẽ để trong thư mục /images cùng cấp với file này

### Technical/Integrations

51. Hướng kỹ thuật ưu tiên cho Woo purchase là giữ `lp_membership` shadow post, tạo `WC_Product_LP_Membership`, hay tạo Woo product thật được map với membership plan?

Trả lời: giữ lp_membership shadow post

52. `learnpress-woo-payment` cần hỗ trợ membership trong cả 2 mode hiện có không: buy directly as LP item và assigned Woo product?

Trả lời: trong mode 1 thì   sẽ mua membership bằng cách chọn mua trực tiếp với tư cách là 1 item của learnpress, và được trả tiền thông qua phương thức thanh toán của learnpress. 

trong mode 2, người dùng sẽ được mua membership bằng cách chọn mua trực tiếp với tư cách là 1 sản phẩm của woocommerce và được trả tiền thông qua phương thức thanh toán của woocommerce

53. Khi Woo order paid, hệ thống nên tạo LP order mới, cập nhật LP order có sẵn, hay có thể activate member trực tiếp không qua LP order?

Trả lời: nên tạo LP order, nhưng check active hay không qua woo order

54. Mapping trạng thái Woo order sang LP order/member chính xác cần như thế nào cho pending, processing, completed, cancelled, failed, refunded, partially refunded?

Trả lời: toàn bộ

55. Woo Subscriptions cần hỗ trợ trạng thái nào trong phase đầu: active, on-hold, cancelled, expired, pending-cancel, payment failed, renewal, switch, resubscribe?

Trả lời: hỗ trợ hết chứ

56. Cần đảm bảo idempotency thế nào để renewal/webhook/status change không tạo duplicate member hoặc kéo dài sai end_date?

Trả lời: cái này đặt vấn đề cho team backend xử lý

57. Coupon, tax, invoice, order note và refund của Woo cần đồng bộ sang LearnPress ở mức nào?

Trả lời: mấy cái này cũng đặt vấn đề cho team backend

58. Site lớn cần performance target gì: số plan, số member, số rule, số course/post, số order/ngày, response time khi check access?

Trả lời: không quan tâm, không cần đưa vào

59. Restriction có cần áp dụng cho REST API, AJAX, blocks, search, feeds, comments, sitemap, page builder preview hoặc headless frontend không?

Trả lời: không cầ đưa vào kế hoạch

60. Cần hỗ trợ multisite, multilingual plugin, currency switcher, cache plugin, page builder hoặc theme phổ biến nào ở v1 không?

Trả lời: không cầ đưa vào kế hoạch

### SEO/GTM

61. Primary SEO keyword chính nên là gì: `learnpress membership`, `learnpress restrict content`, `learnpress woocommerce membership`, hay keyword khác?

Trả lời: learnpress membership

62. Ngôn ngữ và thị trường SEO ưu tiên là tiếng Anh global, tiếng Việt, hay đa ngôn ngữ?

Trả lời: tiếng Anh global

63. Product page CTA chính là `Buy Now`, `View Demo`, `Try Beta`, `Join Waitlist`, `Contact Sales`, hay `View Docs`?

Trả lời: Buy Now

64. Có proof point nào có thể dùng trong marketing không: số active sites LearnPress, khách hàng beta, testimonial, support request count, performance benchmark, hoặc compatibility badge?

Trả lời: có, nhưng bên marketing sẽ tự thêm số liệu

65. Launch channel dự kiến là gì: LearnPress marketplace, ThimPress site, email list, blog SEO, YouTube tutorial, partner agencies, affiliate, hoặc AppSumo/lifetime deal?

Trả lời:ThimPress site

66. Có muốn làm comparison/alternative content với WooCommerce Memberships, MemberPress, PMPro, Restrict Content Pro không?

Trả lời: không

### QA/Acceptance Criteria

67. Acceptance criteria quan trọng nhất cho Restrict Content là gì? Ví dụ: guest không xem được lesson restricted, member đúng plan xem được, query listing ẩn đúng, admin preview không bị ảnh hưởng.

Trả lời: toàn bộ

68. Acceptance criteria quan trọng nhất cho Woo checkout là gì? Ví dụ: mua plan qua Woo thành công tạo LP order item `lp_membership`, kích hoạt member, refund revoke access, không phá LP checkout.

Trả lời: toàn bộ

69. Permission matrix cần test những capability nào cho Admin, Manager, Instructor, Student, Customer, Guest và Developer?

Trả lời: toàn bộ, trừ developer

70. Regression tests bắt buộc cần giữ cho flow hiện có là gì: plan-course mapping, LP checkout, member activation, expiry cron, reminder email, profile tab, shortcode/pricing block?

Trả lời: toàn bộ

71. Security tests cần ưu tiên gì: bypass content qua REST, direct lesson URL, shortcode/block leakage, nonce/capability admin, XSS trong restricted message, order spoofing, refund abuse?

Trả lời: toàn bộ

72. Performance test target cụ thể là gì cho access check, frontend query filtering, admin rule table và Woo order activation?

Trả lời: ok toàn bộ

73. Compatibility matrix cần bao gồm theme/plugin nào: LearnPress theme, WooCommerce gateway phổ biến, Woo Subscriptions, Elementor, cache plugin, multilingual plugin?

Trả lời: WooCommerce gateway phổ biến, Woo Subscriptions

### Documentation

74. Documentation cần viết bằng tiếng Anh, tiếng Việt, hay cả hai?

Trả lời: tiếng anh

75. Những doc pages nào bắt buộc có khi launch: install, setup restriction rules, setup Woo checkout, pricing block/shortcode, member management, refunds/cancel, Woo Subscriptions, troubleshooting, hooks/filters/API, FAQ?

Trả lời: toàn bộ, nhưng k cần developer docs

76. Developer docs cần mức chi tiết nào: hook list, function reference, example snippets, lifecycle diagrams, order mapping examples, custom rule examples?

Trả lời: tạm thời k cần developer docs

77. Support docs cần xử lý các lỗi nào: user paid but no access, access not revoked after refund, content still visible, Woo order not linked to LP order, guest checkout issue, cache conflict, expired member issue?

Trả lời: không cần, chỉ cần docs hướng dẫn, chưa cần docs sửa lỗi

78. Bạn có ảnh màn hình hoặc video ngắn nào nên dùng cho docs/product page không: setup rule, pricing CTA, Woo checkout, member profile, restricted message, admin member status? không

Trả lời:

## Câu Hỏi Ưu Tiên Cao

1. MVP v1 bắt buộc phải có cả Restrict Content và WooCommerce checkout không, hay nên tách release?

Trả lời: tách release, woocommerce checkout trước > Restrict Content

2. Bằng chứng demand mạnh nhất hiện có là gì: ticket, khách hàng trả tiền, lost deal, survey, search demand, hay competitor switching?

Trả lời: không có đâu, cái nay là concept team nghĩ ra và muốn làm

3. Rule targeting và restriction mode tối thiểu cho v1 là gì?

Trả lời: 

4. Instructor/Manager có quyền tạo rule không, hay chỉ Admin?

Trả lời: chỉ admin

5. Woo purchase architecture ưu tiên là `lp_membership` shadow post, `WC_Product_LP_Membership`, hay mapped Woo product?

Trả lời:  cái này để team backend quyết định, đừng nói sâu về code

6. Mapping Woo order/subscription status sang membership lifecycle chính xác là gì?

Trả lời: cái này để team backend quyết định, đừng nói sâu về code


7. Guest checkout sẽ xử lý thế nào để đảm bảo membership luôn có user account?

Trả lời: bắt đăng ký/ đăng nhập

8. Pricing/package là paid add-on riêng, bundle, subscription license, hay tiered pricing?

Trả lời: gói membership là paid add-on riêng

9. Những màn hình hiện tại nào bạn có thể cung cấp ảnh để vẽ wireframe chuẩn theo UI thật?

Trả lời: có sẽ để trong thư mục /images

10. Acceptance criteria bắt buộc để nói release này không phá flow LP checkout và membership hiện tại là gì?

Trả lời:

## Bước Tiếp Theo

Sau khi trả lời xong các câu hỏi quan trọng, chạy:

```bash
npm run create -- learnpress-membership
```
