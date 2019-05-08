const validator = require("./validator.js");
testLines = "^XA^CI28^^LL2673^MMK^KV0,9,0,0,0^MNN^MFN,N^POI^PW576~PL0^LH0,0^FWN^LS0^FO0,0^FO213,70^XGE:SWOOSH.GRF,1,1^FS^A@N,27,26,E:INCONSOL.TTF^FO266,175^FB576,1,5,L,0^FH^FD_4E_49_4B_45^FS^A@N,27,26,E:INCONSOL.TTF^FO196,210^FB576,1,5,L,0^FH^FD_46_61_73_68_69_6F_6E_20_56_61_6C_6C_65_79^FS^A@N,27,26,E:INCONSOL.TTF^FO98,245^FB576,1,5,L,0^FH^FD_37_30_30_37_20_46_72_69_61_72_73_20_52_6F_61_64_2C_20_53_75_69_74_65_20_37_37_30^FS^A@N,27,26,E:INCONSOL.TTF^FO154,280^FB576,1,5,L,0^FH^FD_53_61_6E_20_44_69_65_67_6F_2C_20_43_41_20_39_32_31_30_38^FS^A@N,27,26,E:INCONSOL.TTF^FO112,315^FB576,1,5,L,0^FH^FD_54_65_6C_65_70_68_6F_6E_65_3A_20_28_36_31_39_29_20_32_39_34_2D_39_33_38_35^FS^A@N,27,26,E:INCONSOL.TTF^FO0,490^FB576,1,5,L,0^FH^FD_47_4C_4F_42_41_4C_20_46_4C_45_45_43_45_20_48_4F_4F_44_59_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_24_33_34_2E_39_39_20_54^FS^A@N,27,26,E:INCONSOL.TTF^FO14,525^FB576,1,5,L,0^FH^FD_30_30_30_30_34_30_30_30_31_35_39_31_34_30_20_20_53_69_7A_65_3A_20_53^FS^A@N,27,26,E:INCONSOL.TTF^FO0,595^FB576,1,5,L,0^FH^FD_53_75_62_74_6F_74_61_6C_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_24_33_34_2E_39_39^FS^A@N,27,26,E:INCONSOL.TTF^FO0,630^FB576,1,5,L,0^FH^FD_54_61_78_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_24_32_2E_37_31^FS^A@N,27,26,E:INCONSOL.TTF^FO0,665^FB576,1,5,L,0^FH^FD_54_6F_74_61_6C_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_24_33_37_2E_37_30^FS^A@N,27,26,E:INCONSOL.TTF^FO112,735^FB576,1,5,L,0^FH^FD_4E_75_6D_62_65_72_20_6F_66_20_49_74_65_6D_28_73_29_20_53_6F_6C_64_3A_20_31^FS^A@N,27,26,E:INCONSOL.TTF^FO84,770^FB576,1,5,L,0^FH^FD_4E_75_6D_62_65_72_20_6F_66_20_49_74_65_6D_28_73_29_20_52_65_74_75_72_6E_65_64_3A_20_30^FS^A@N,27,26,E:INCONSOL.TTF^FO0,840^FB576,1,5,L,0^FH^FD_43_61_73_68_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_24_33_37_2E_37_30^FS^A@N,27,26,E:INCONSOL.TTF^FO0,980^FB576,1,5,L,0^FH^FD_53_74_6F_72_65_3A_20_30_30_33_30_37_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_4F_70_3A_20_32_30_30_35_30^FS^A@N,27,26,E:INCONSOL.TTF^FO0,1015^FB576,1,5,L,0^FH^FD_44_61_74_65_3A_20_34_2F_32_39_2F_32_30_31_39_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_54_69_6D_65_3A_20_31_33_3A_34_36^FS^A@N,27,26,E:INCONSOL.TTF^FO0,1050^FB576,1,5,L,0^FH^FD_52_65_67_3A_20_32_35_30_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_20_54_72_61_6E_3A_20_30_33_32_35_38^FS^A@N,27,26,E:INCONSOL.TTF^FO14,1190^FB576,1,5,L,0^FH^FD_57_65_20_64_65_73_69_67_6E_20_4E_69_6B_65_20_70_72_6F_64_75_63_74_73_20_74_6F_20_62_72_69_6E_67_20_71_75_61_6C_69_74_79^FS^A@N,27,26,E:INCONSOL.TTF^FO14,1225^FB576,1,5,L,0^FH^FD_61_6E_64_20_70_65_72_66_6F_72_6D_61_6E_63_65_20_74_6F_20_79_6F_75_72_20_61_63_74_69_76_65_20_6C_69_66_65_2E_20_57_65^FS^A@N,27,26,E:INCONSOL.TTF^FO14,1260^FB576,1,5,L,0^FH^FD_66_65_65_6C_20_74_68_65_20_73_61_6D_65_20_77_61_79_20_61_62_6F_75_74_20_63_6F_6E_73_75_6D_65_72_20_73_65_72_76_69_63_65^FS^A@N,27,26,E:INCONSOL.TTF^FO0,1295^FB576,1,5,L,0^FH^FD_49_66_20_79_6F_75_20_66_65_65_6C_20_74_68_65_20_6E_65_65_64_20_74_6F_20_72_65_74_75_72_6E_20_6F_72_20_65_78_63_68_61_6E_67_65^FS^A@N,27,26,E:INCONSOL.TTF^FO112,1330^FB576,1,5,L,0^FH^FD_61_6E_20_69_74_65_6D_20_28_73_65_65_20_67_75_69_64_65_6C_69_6E_65_73_20_61_74^FS^A@N,27,26,E:INCONSOL.TTF^FO28,1365^FB576,1,5,L,0^FH^FD_77_77_77_2E_4E_69_6B_65_2E_63_6F_6D_2F_72_65_74_75_72_6E_73_29_2C_20_77_65_20_77_69_6C_6C_20_67_6C_61_64_6C_79^FS^A@N,27,26,E:INCONSOL.TTF^FO56,1400^FB576,1,5,L,0^FH^FD_6D_61_6B_65_20_69_74_20_68_61_70_70_65_6E_2E_20_50_6C_65_61_73_65_20_72_65_74_61_69_6E_20_79_6F_75_72^FS^A@N,27,26,E:INCONSOL.TTF^FO84,1435^FB576,1,5,L,0^FH^FD_72_65_63_65_69_70_74_20_61_73_20_70_72_6F_6F_66_20_6F_66_20_70_75_72_63_68_61_73_65_2E^FS^A@N,27,26,E:INCONSOL.TTF^FO42,1505^FB576,1,5,L,0^FH^FD_47_65_74_20_65_78_63_6C_75_73_69_76_65_20_6F_66_66_65_72_73_20_69_6E_20_74_68_65_20_4E_69_6B_65_20_41_70_70^FS^A@N,27,26,E:INCONSOL.TTF^FO126,1540^FB576,1,5,L,0^FH^FD_44_6F_77_6E_6C_6F_61_64_20_40_20_4E_49_4B_45_2E_43_4F_4D_2F_41_50_50^FS^A@N,27,26,E:INCONSOL.TTF^FO14,1575^FB576,1,5,L,0^FH^FD_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D_2D^FS^A@N,27,26,E:INCONSOL.TTF^FO42,1610^FB576,1,5,L,0^FH^FD_57_65_20_73_74_72_69_76_65_20_74_6F_20_6D_65_65_74_20_74_68_65_20_65_78_61_63_74_20_6E_65_65_64_73_20_6F_66^FS^A@N,27,26,E:INCONSOL.TTF^FO28,1645^FB576,1,5,L,0^FH^FD_65_76_65_72_79_20_41_74_68_6C_65_74_65_2A_20_74_68_61_74_20_76_69_73_69_74_73_20_6F_75_72_20_73_74_6F_72_65_73_2E^FS^A@N,27,26,E:INCONSOL.TTF^FO28,1680^FB576,1,5,L,0^FH^FD_57_65_20_77_6F_75_6C_64_20_6C_6F_76_65_20_74_6F_20_68_65_61_72_20_6D_6F_72_65_20_66_72_6F_6D_20_79_6F_75_20_6F_6E^FS^A@N,27,26,E:INCONSOL.TTF^FO84,1715^FB576,1,5,L,0^FH^FD_79_6F_75_72_20_72_65_63_65_6E_74_20_65_78_70_65_72_69_65_6E_63_65_20_61_74_20_74_68_65^FS^A@N,27,26,E:INCONSOL.TTF^FO56,1750^FB576,1,5,L,0^FH^FD_4E_69_6B_65_20_53_74_6F_72_65_20_6F_72_20_4E_69_6B_65_20_46_61_63_74_6F_72_79_20_53_74_6F_72_65_2E^FS^A@N,27,26,E:INCONSOL.TTF^FO28,1820^FB576,1,5,L,0^FH^FD_50_6C_65_61_73_65_20_74_61_6B_65_20_61_20_73_68_6F_72_74_20_73_75_72_76_65_79_20_62_79_20_73_63_61_6E_6E_69_6E_67^FS^A@N,27,26,E:INCONSOL.TTF^FO56,1855^FB576,1,5,L,0^FH^FD_74_68_65_20_51_52_20_43_6F_64_65_20_62_65_6C_6F_77_2C_20_6F_72_20_62_79_20_76_69_73_69_74_69_6E_67^FS^A@N,27,26,E:INCONSOL.TTF^FO140,1890^FB576,1,5,L,0^FH^FD_77_77_77_2E_6D_79_6E_69_6B_65_76_69_73_69_74_2D_6E_61_2E_63_6F_6D^FS^A@N,27,26,E:INCONSOL.TTF^FO42,1925^FB576,1,5,L,0^FH^FD_45_6E_74_65_72_20_63_6F_64_65_3A_20_32_46_43_36_20_54_32_45_48_20_41_34_38_32_20_4E_48_47_4D_20_31_56_50^FS^FO138,1960^BQN,2,6^FD:>https://www.inmoment.com/websurvey/2/begin?gateway=NikeNAQRCode&base32=2FC6T2EHA482NHGM1VP&PrintEreceipt=1^FS^BY2,3^A@N,27,26,E:INCONSOL.TTF^FO28,2260^FB576,1,5,L,0^FH^FD_53_75_72_76_65_79_20_65_78_70_69_72_65_73_20_73_65_76_65_6E_20_64_61_79_73_20_66_72_6F_6D_20_64_61_74_65_20_6F_66^FS^A@N,27,26,E:INCONSOL.TTF^FO0,2295^FB576,1,5,L,0^FH^FD_70_75_72_63_68_61_73_65_2E_20_56_6F_69_64_20_77_68_65_72_65_20_70_72_6F_68_69_62_69_74_65_64_2E_20_53_65_65_20_61_62_6F_76_65^FS^A@N,27,26,E:INCONSOL.TTF^FO84,2330^FB576,1,5,L,0^FH^FD_77_65_62_73_69_74_65_20_66_6F_72_20_63_6F_6D_70_6C_65_74_65_20_64_65_74_61_69_6C_73_2E^FS^B2N,118,N,N,N^FT50,2483,0^BCN,,Y,N^FD>:00307250032580429190^FS^PN0^XZ";

params = {
    locale: "english1",
    location: "Fashion Valley",
    address1: "7007 Friars Road, Suite 770",
    address2: "San Diego, CA 92108",
    telephone: "(619) 294-9385",
    store: "00307",
    operator: "20050",
    register: "250",
    transaction: "03258",
    date: "4/29/2019",
    time: "13:46",
    items: [
        {
            desc: "GLOBAL FLEECE HOODY",
            gtin: " 00004000159140",
            size: "S"
        }
    ],
    numSold: "1",
    numReturned: "0",
    subtotal: "$34.99",
    tax: "$2.71",
    total: "$37.70",
    cash: "$37.70"
}

validator.validate(testLines, params);
