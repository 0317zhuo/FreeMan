import "server-only";

export const cooperationSteps = [
  { title: "添加好友，说明来意", description: "简单介绍自己和想做的产品，从一个想法开始交流。" },
  { title: "提交需求", description: "说明要解决的问题、核心功能，以及预算和时间预期。" },
  { title: "初步评估", description: "讨论需求是否适合合作，确认可行性与大致范围。" },
  { title: "需求梳理与报价", description: "整理功能清单、交付内容、排期和费用，明确验收方式。" },
  { title: "签署约定并启动", description: "确认双方约定与付款节点后，启动项目。" },
  { title: "分阶段开发与验收", description: "按约定的阶段推进开发，一起检查功能与反馈。" },
  { title: "部署交付", description: "按约定完成部署，并交接代码、文档与相关资料。" },
  { title: "维护迭代（可选）", description: "交付后的维护与新功能可另行商议，额外收费。" },
];

export const paymentStages = [
  { percent: "40", title: "启动款", description: "确认需求与合作约定后，启动开发。" },
  { percent: "40", title: "阶段款", description: "完成约定的主要功能，并通过阶段验收。" },
  { percent: "20", title: "交付尾款", description: "完成最终验收，按约定结清并交付。" },
];

// FAQ 为可替换的初稿；正式合作条件以双方确认的约定为准。
export const developmentFaqs = [
  { question: "只有一个想法，还没有需求文档，可以聊吗？", answer: "可以先描述你想解决的问题、面向谁，以及最想实现的功能。不必一开始就准备完整文档，可以在沟通中逐步梳理。" },
  { question: "一个项目需要多久，费用怎么确定？", answer: "周期与费用需要结合功能范围、设计要求、现有资料和交付方式评估。梳理需求后，再确认排期与报价。" },
  { question: "开发过程中想增加功能怎么办？", answer: "先讨论调整对工作量、费用和排期的影响，再确认是否加入当前阶段；也可以把新增功能放到后续迭代。" },
  { question: "源码、部署和文档会一起交付吗？", answer: "具体交付清单在启动前确认，包括源码、部署方式、必要文档及相关账号或资源的交接安排。" },
  { question: "服务器和第三方服务费用包含在开发费里吗？", answer: "域名、服务器、模型 API 等第三方资源的使用与费用，需要在报价时单独确认。不要默认它们已包含在开发费中。" },
  { question: "上线后可以继续维护吗？", answer: "可以另行讨论维护与迭代需求。维护属于可选的额外收费服务，范围、周期和费用以双方约定为准。" },
];

export const requirementChecklist = [
  { title: "想做什么", description: "产品想法、使用人群，以及要解决的问题。" },
  { title: "需要哪些功能", description: "必需功能、优先级，以及可以参考的产品。" },
  { title: "预算与时间", description: "预算范围、期望交付时间；尚未确定也可说明。" },
  { title: "已有的资料", description: "设计稿、现有代码、内容素材或需求文档。" },
];
