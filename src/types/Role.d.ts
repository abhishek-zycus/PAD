declare namespace roleNS {
  interface IroleCred {
    role: string;
    isTotalContractVisible: boolean;
    isAvgRevenueVisible: boolean;
    isTotalDuePaymentVisible: boolean;
    isTotalExpectedPaymentVisible: boolean;
    canCreateRole: boolean;
  }
}
