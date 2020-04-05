<template>
  <div>
    <div class="FS18 TAC LH40 ">js转换旧列表配置为新列表配置，更简洁的形式！！！</div>
    <el-row :gutter="10" type="flex">
      <el-col>
        <el-input
          style="width:100%"
          type="textarea"
          :rows="18"
          placeholder="请输入内容"
          v-model="codeSrc"
        ></el-input>
      </el-col>
      <el-col style="width:100px">
        <el-button type="primary" @click="transform">转换</el-button>
      </el-col>
      <el-col>
        <el-input
          style="width:100%"
          type="textarea"
          :rows="18"
          placeholder="输出结果"
          v-model="codeResult"
        ></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>




//#region 主办方
{
    let objBase = {
        label: "主办方",
        prop: "sponsorId",
    }
    D_ITEMS.sponsorId = {
        ...objBase,
        slot: "slot_detail_item_sponsorId"
    };

    COLUMNS.sponsorId = {
        ...objBase, width: 100,
        formatter: function (rowData) {
            if (rowData.sponsorDoc) {
                return rowData.sponsorDoc.name
            }
        }
    };

    F_ITEMS.sponsorId = {
        ...objBase,
        type: "select",
        ajax: {
            url: "/crossList?page=tangball_franchisee",
            keyLabel: "name",
            keyValue: "P1"
        }
    };
}

//#endregion

//#region 赛事名称
{
    let objBase = {
        label: "赛事名称",
        prop: "matchName",
    }
    D_ITEMS.matchName = {
        ...objBase,
    };
    COLUMNS.matchName = { ...objBase, width: 270, };
    F_ITEMS.matchName = { ...objBase, type: "input" };
    F_ITEMS.matchName = {
        ...objBase,
        rules: [{ required: true, message: "赛事名称不能为空" }],
    };
    F_ITEMS.matchName_search = {
        ...objBase,
        type: "input_find_vague",
    };
}

//#endregion


//#region 赛事时间
{
    let objBase = {
        label: "赛事时间",
        prop: "matchTime",
    }
    D_ITEMS.matchTime = {
        ...objBase,
    };
    COLUMNS.matchTime = {
        ...objBase, width: 140,
        sortable: "custom",//开启后端排序
        formatter: function (rowData) {
            return moment(rowData.matchTime).format("YYYY-MM-DD HH:mm");
        }
    };
    F_ITEMS.matchTime = {
        ...objBase,
        label: "赛事开始时间",
        type: "dateTime",
        rules: [{ required: true, message: "不能为空" }],
    };
    F_ITEMS.matchTime_search = {
        ...objBase,
        type: "time_period"
    };
}

//#endregion

//#region 报名开始时间
{
    let objBase = {
        label: "报名开始时间",
        prop: "enrollTime",
    }
    D_ITEMS.enrollTime = {
        ...objBase,
    };
    COLUMNS.enrollTime = { ...objBase, width: 70, };
    F_ITEMS.enrollTime = {
        ...objBase, type: "dateTime",
        rules: [{ required: true, message: "不能为空" }],
    };
}

//#endregion




//#region 赛事Id
{
    let objBase = {
        label: "赛事",
        prop: "matchId",
    }
    D_ITEMS.matchId = {
        ...objBase,
    };

    D_ITEMS.matchId_slot = {
        ...objBase,
        slot: "slot_detail_item_matchId"
    };
    COLUMNS.matchId = {
        ...objBase,
        // slot: "slot_detail_item_matchId",
        width: 250,
        formatter: function (rowData) {
            return lodash.get(rowData, "matchDoc.matchName", "") + `(${rowData.matchId})`
        }
    };

    COLUMNS.enrool_matchId = {
        ...objBase,
        label: "赛事名称",
        width: 240,
        formatter: function (rowData) {
            if (rowData.matchDoc) {
                return rowData.matchDoc.matchName
            }
        }
    };
    F_ITEMS.matchId = { ...objBase, type: "input" };

    F_ITEMS.matchId_readonly = {
        ...objBase,
        type: "ajax_populate",
        cfAjaxPopulate: { populateKey: "matchName", page: "tangball_match" }
    };


    F_ITEMS.matchId_select = {
        ...objBase,
        type: "select",
        ajax: {
            url: "/crossList?page=tangball_match",
            keyLabel: "matchName",
            keyValue: "P1"
        }
    };

    F_ITEMS.matchId_select_required = {
        ...F_ITEMS.matchId_select_search,
        rules: [{ required: true, message: "赛事不能为空" }]
    };

}

//#endregion

//#region 赛事信息
{
    let objBase = {
        label: "赛事信息",
        prop: "matchInfo",
    }
    D_ITEMS.matchInfo = {
        ...objBase,
    };
    D_ITEMS.matchInfo = {
        ...objBase,
        slot: 'slot_detail_item_matchInfo'
    };
    COLUMNS.matchInfo = { ...objBase, width: 70, };
    F_ITEMS.matchInfo = {
        ...objBase,
        slot: "slot_form_item_matchInfo"
    };
}

//#endregion

//#region 球龄
{
    let objBase = {
        label: "球龄",
        prop: "ballAge",
    }

    D_ITEMS.ballAge = {
        ...objBase,
        formatter: function (rowData) {
            if (rowData.ballAge == 1) {
                return "一年以下";
            } else if (rowData.ballAge == 2) {
                return "一到三年";
            } else if (rowData.ballAge == 3) {
                return "三到五年";
            } else if (rowData.ballAge == 4) {
                return "五到十年";
            } else if (rowData.ballAge == 5) {
                return "十年以上";
            } else {
                return "暂无";
            }
        }
    };
    COLUMNS.ballAge = { ...objBase, width: 60, };
    F_ITEMS.ballAge = {
        ...objBase,
        type: "select",
        options: [
            { label: "一年以下", value: 1 },
            { label: "一到三年", value: 2 },
            { label: "三到五年", value: 3 },
            { label: "五到十年", value: 4 },
            { label: "十年以上", value: 5 }
        ]
    };
}

//#endregion





//#region 参赛次数
{
    let objBase = {
        label: "参赛次数",
        prop: "entries",
    }
    D_ITEMS.entries = {
        ...objBase,
    };
    COLUMNS.entries = { ...objBase, width: 70, };
    COLUMNS.entries = {
        ...objBase,
        width: 60,
        statistics: { listIndex: 'list_enroll', targetIdKey: 'memberId' }
    };
    F_ITEMS.entries = { ...objBase, type: "input" };
}

//#endregion


//#region 所属球场
{
    let objBase = {
        label: "所属球场",
        prop: "venueId",
    }
    D_ITEMS.venueId = {
        ...objBase,
        slot: 'slot_detail_item_venueId'
    };

    COLUMNS.venueId = {
        ...objBase,
        width: 80,
        formatter: function (data) {
            if (data.venue) {
                return data.venue.name ? data.venue.name : "无"
            }
        }
    };
    F_ITEMS.venueId = { ...objBase, type: "input" };
}

//#endregion


//#region 所属加盟商
{
    let objBase = {
        label: "所属加盟商",
        prop: "franchiseeId",
    }
    D_ITEMS.franchiseeId = {
        ...objBase,
        slot: 'slot_detail_item_franchiseeId'
    };

    COLUMNS.franchiseeId = {
        ...D_ITEMS.franchiseeId,
        prop: "franchiseeId",
        width: 90,
        // formatter: function (row) {
        //     return franchiseeDoc
        //     if (row.franchisee) {
        //         return row.franchisee.name ? row.franchisee.name : '无'
        //     }
        // }
    };

    COLUMNS.franchiseeName = {
        ...objBase,
        prop: "franchiseeName",
        requireProp: ["franchiseeId"],
        width: 120,
        formatter: function (row) {
            return lodash.get(row, `franchiseeDoc.name`, '');

        }
    };
    F_ITEMS.franchiseeId = {
        ...objBase,
        type: "select",
        ajax: {
            url: "/crossList?page=tangball_franchisee",
            keyLabel: "name",
            keyValue: "P1"
        }
    };
}

//#endregion


//#region 报名时间
{
    let objBase = {
        label: "报名时间",
        prop: "time",
    }

    D_ITEMS.time_enrool = {
        ...objBase,
        formatter: function (row) {
            return moment(row.time).format('YYYY-MM-DD HH:mm')
        }
    };
    F_ITEMS.time = {
        ...objBase,
        type: "date"
    };
    COLUMNS.enrool_time = { ...D_ITEMS.time_enrool, width: 130, };
    F_ITEMS.time_enrool = { ...objBase, type: "input" };
}

//#endregion


//#region 支付状态-需去重
{
    let objBase = {
        label: "支付状态",
        prop: "payStatus",
    }
    D_ITEMS.payStatus = {

        ...objBase,
        formatter: function (rowData) {
            if (rowData.payStatus == 2) {
                return "已支付";
            } else {
                return "未支付";
            }
        }
    };


    COLUMNS.payStatus = { ...D_ITEMS.payStatus, width: 80, };
    F_ITEMS.payStatus = {
        label: "支付状态",
        prop: "payStatus",
        type: "select",
        options: [
            { label: "已支付", value: 2 },
            { label: "未支付", value: 1 }
        ]
    };
}

//#endregion

//待处理
COLUMNS.auditStatus = Object.assign({}, D_ITEMS.auditStatus, { width: 80 })

//#region 赛事类型
{
    let objBase = {
        label: "赛事类型",
        prop: "matchForm",
    }
    D_ITEMS.matchForm = {
        ...objBase,
    };
    COLUMNS.matchForm = {
        ...objBase,
        label: "类型",
        width: 50,
        formatter: function (rowData) {
            return rowData.matchForm == 2 ? "团体赛" : "个人赛"; //三元表达式
        }
    };


    COLUMNS.enrool_matchForm = {
        ...objBase,
        prop: "matchDoc",
        width: 80,
        formatter: function (rowData) {
            if (rowData.matchDoc) {
                if (rowData.matchDoc.matchForm == 1) {
                    return '个人赛'
                } else {
                    return '团体赛'
                }
            }
        }
    };

    F_ITEMS.matchForm = {
        ...objBase,
        type: "select",
        options: [
            { label: "个人赛", value: 1 },
            { label: "团体赛", value: 2 }
        ],
    };
}

//#endregion


//#region 比赛日期
{
    let objBase = {
        label: "比赛日期",
        prop: "playingTime"
    }

    D_ITEMS.playingTime = {
        ...objBase,
        formatter: function (row) {
            if (!row.playingTime) return "";
            return moment(row.playingTime).format('YYYY-MM-DD')
        }
    };
    COLUMNS.playingTime = { ...D_ITEMS.playingTime, width: 100, };
    F_ITEMS.playingTime = {
        ...objBase,
        type: "date"
    };
}

//#endregion


//#region 赛事结果说明
{
    let objBase = {
        label: "赛事结果说明",
        prop: "matchResult",
    }

    D_ITEMS.matchResult = {
        ...objBase,
        type: 'html'
    };
    COLUMNS.matchResult = { ...objBase, width: 70, };

    F_ITEMS.matchResult = {
        ...objBase,
        type: "editorTM",
        col_span: 24 //控制显示一行多列
    };
}

//#endregion


//#region 0000
{
    let objBase = {
        label: "赛事规程",
        prop: "matchManual",
    }
    D_ITEMS.matchManual = {
        ...objBase,
    };
    D_ITEMS.matchManual = {
        ...objBase,
        type: 'html'
    };
    COLUMNS.aamatchManuala = { ...objBase, width: 70, };
    F_ITEMS.matchManual = {
        ...objBase,
        type: "editorTM",
        col_span: 24 //控制显示一行多列
    };
}

//#endregion


//#region 球员姓名
{
    let objBase = {
        label: "球员姓名",
        prop: "name"
    }

    D_ITEMS.member_name = {
        ...objBase,
    };
    COLUMNS.member_name = { ...objBase, width: 80, };

    F_ITEMS.member_name = { ...objBase, type: "input" };
}

//#endregion


//#region 赛事规则
{
    let objBase = {
        label: "赛事规则",
        prop: "ruleId",
    }
    D_ITEMS.ruleId = {
        ...objBase,
    };
    COLUMNS.ruleId = { ...objBase, width: 70, };
    F_ITEMS.ruleId = {
        ...objBase,
        type: "select",
        ajax: {
            url: "/crossList?page=tangball_rule",
            keyLabel: "name",
            keyValue: "P1"
        },
    };
}

//#endregion


//#region 报名要求
{
    let objBase = {
        label: "报名要求",
        prop: "enrollRequirements"
    }
    D_ITEMS.enrollRequirements = {
        ...objBase,
    };
    D_ITEMS.enrollRequirements = {
        ...objBase,
    };
    COLUMNS.enrollRequirements = { ...objBase, width: 70, };
    F_ITEMS.enrollRequirements = {
        ...objBase,
        type: "textarea",
        col_span: 24
    };
}

//#endregion


//#region 赛事介绍
{
    let objBase = {
        label: "赛事介绍",
        prop: "matchIntroduce"
    }

    D_ITEMS.matchIntroduce = {
        ...objBase,
    };


    COLUMNS.matchIntroduce = { ...objBase, width: 70, };
    F_ITEMS.matchIntroduce = {
        ...objBase,
        type: "textarea",
        col_span: 24
    };
}

//#endregion


//#region 报名费用
{
    let objBase = {
        label: "报名费",
        prop: "registrationFee"
    }

    D_ITEMS.registrationFee = {
        ...objBase,
    };

    COLUMNS.registrationFee = {
        ...objBase,
        width: 60
    };
    F_ITEMS.registrationFee = {
        ...objBase,
        type: "number",
    };
}

//#endregion


//#region 报名数
{
    let objBase = {
        label: "报名数",
        prop: "registeredPersons"
    }

    D_ITEMS.registeredPersons = {
        ...objBase,
    };
    COLUMNS.registeredPersons = { ...objBase, width: 70, };
    F_ITEMS.registeredPersons = { ...objBase, type: "input" };
}

//#endregion


//#region 赛事图片
{
    let objBase = {
        label: "赛事图片",
        prop: "album",
    }

    D_ITEMS.match_album = {
        ...objBase,
        slot: "slot_detail_item_album"
    };

    COLUMNS.match_album = { ...objBase, width: 70, };
    F_ITEMS.match_album = { ...objBase, type: "input" };
    F_ITEMS.album = {
        label: "相册",
        prop: "album",
        type: "upload",
        col_span: 24, //控制显示一行多列
        tips: "图片尺寸比例最好保持在1:0.8，建议尺寸：宽500px，高400px"
    };
}

//#endregion


//#region 比赛球场
{
    let objBase = {
        label: "比赛球场",
        prop: "venue",
    }
    D_ITEMS.aaaa = {

    };
    D_ITEMS.venue = {
        ...objBase,
        slot: "slot_detail_item_cityVenueList"
    };
    COLUMNS.venue = { ...objBase, width: 70, };
    F_ITEMS.venue = {
        ...objBase,
        type: "select",
        slot: "slot_form_item_cityVenueList",
        col_span: 24
    };
}

//#endregion


//#region 赛程设置
{
    let objBase = {
        label: "赛程设置",
        prop: "progress",
    }


    D_ITEMS.progress = {
        ...objBase,
        slot: 'slot_detail_item_progress'
    };

    COLUMNS.progress = { ...objBase, width: 70, };
    F_ITEMS.progress = {
        ...objBase,
        slot: 'slot_form_item_progress',
        col_span: 24
    };
}

//#endregion


//#region 报名结束时间
{
    let objBase = {
        label: "报名结束时间",
        prop: "enrollTimeEnd"
    }

    D_ITEMS.enrollTimeEnd = {
        ...objBase,
    };

    COLUMNS.enrollTimeEnd = { ...objBase, width: 70, };
    F_ITEMS.enrollTimeEnd = {
        ...objBase,
        type: "dateTime",
        rules: [{ required: true, message: "不能为空" }],
    };
}

//#endregion


//#region 赛事状态
{
    let objBase = {
        label: "赛事状态",
        prop: "matchStatus",
    }

    D_ITEMS.matchStatus = {
        ...objBase,
        formatter: function (rowData) {
            let obj = util.getTimeStatus({
                start: rowData.matchTime,
                end: rowData.matchTimeEnd
            });
            let htmlResult = `比赛时间：${obj.start}&nbsp;到&nbsp;${obj.end} &nbsp;&nbsp;&nbsp;当前状态：比赛${obj.msg}`;
            return htmlResult;
        }
    };

    COLUMNS.matchStatus = {
        ...objBase,
        requireProp: ["enrollTime", 'enrollTimeEnd', 'matchTime', 'matchTimeEnd'],
        width: 100,
        formatter: function (rowData) {
            let nowDate = new Date().getTime();
            let enrollTimeDate = new Date(rowData.enrollTime).getTime();
            let enrollTimeEnd = new Date(rowData.enrollTimeEnd).getTime();
            let matchTime = new Date(rowData.matchTime).getTime();
            let matchTimeEnd = new Date(rowData.matchTimeEnd).getTime();
            if (nowDate > matchTimeEnd) {
                return '赛事已结束'
            } else if (nowDate > matchTime) {
                return '赛事已开始'
            } else if (nowDate > enrollTimeEnd) {
                return '报名时间已结束'
            } else if (nowDate > enrollTimeDate) {
                return '火热报名中'
            } else {
                return '报名时间未到'
            }
        }
    };
    F_ITEMS.matchStatus = { ...objBase, type: "input" };
}

//#endregion


//#region 发布状态
{
    let objBase = {
        label: "发布状态",
        prop: "publicationStatus",
    }


    D_ITEMS.publicationStatus = {
        ...objBase,
        formatter: function (rowData) {
            return rowData.publicationStatus == 1 ? "发布" : "未发布"; //三元表达式
        }
    };
    COLUMNS.publicationStatus = { ...D_ITEMS.publicationStatus, width: 70, };
    F_ITEMS.publicationStatus = {
        ...objBase,
        type: "select",
        options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
    };
}

//#endregion


//#region 报名状态
{
    let objBase = {
        label: "报名状态",
        prop: "matchErollStatus",
    }

    D_ITEMS.matchErollStatus = {
        ...objBase,
        formatter: function (rowData) {
            let obj = util.getTimeStatus({
                start: rowData.enrollTime,
                end: rowData.enrollTimeEnd
            });
            let htmlResult = `报名时间：${obj.start}&nbsp;到&nbsp;${obj.end} &nbsp;&nbsp;&nbsp;当前状态：报名${obj.msg}`;
            return htmlResult;
        }
    };
    COLUMNS.matchErollStatus = { ...objBase, width: 70, };
    F_ITEMS.matchErollStatus = { ...objBase, type: "input" };
}

//#endregion


//#region 0000
{
    let objBase = {
        label: "赛事结束时间",
        prop: "matchTimeEnd",
    }
    D_ITEMS.matchTimeEnd = {
        ...objBase,
    };
    COLUMNS.matchTimeEnd = { ...objBase, width: 70, };
    F_ITEMS.matchTimeEnd = {
        ...objBase,
        type: "dateTime",
        rules: [{ required: true, message: "不能为空" }],
    };
}

//#endregion


//#region 女性人数范围
{
    let objBase = {
        prop: "womenCount",
        label: "女性人数范围",

    }
    D_ITEMS.womenCount = {
        ...objBase,
    };

    COLUMNS.womenCount = { ...objBase, width: 70, };

    F_ITEMS.womenCount = {
        ...objBase,
        type: "numberRange",
        term: { matchForm: 2 },

    };
}

//#endregion


//#region 男性人数范围
{
    let objBase = {
        label: "男性人数范围",
        prop: "menCount",

    }
    D_ITEMS.menCount = {
        ...objBase,
    };

    F_ITEMS.menCount = {
        ...objBase,
        type: "numberRange",
        term: { matchForm: 2 },

    };
}

//#endregion


//#region 队员人数范围
{
    let objBase = {
        label: "队员人数范围",
    }
    D_ITEMS.teamMemberRange = {
        ...objBase,
    };
    COLUMNS.teamMemberRange = { ...objBase, width: 70, };


    F_ITEMS.teamMemberRange = {
        ...objBase,
        keyMin: "teamMemberMin",
        keyMax: "teamMemberMax",
        type: "numberRange",
        term: { matchForm: 2 },
        // rules: [{ required: true, message: "不能为空" }]
    };

}

//#endregion


//#region 球队信息
{
    let objBase = {
        label: "球队信息",
        prop: "groups",
    }
    D_ITEMS.groups = {
        ...objBase,
    };
    COLUMNS.groups = { ...objBase, width: 70, };
    F_ITEMS.groups = {
        ...objBase,
        slot: "slot_form_item_groups"
    };
}

//#endregion


//#region 成绩数
{
    let objBase = {
        label: "成绩数",
        prop: "countAchievement",
    }
    D_ITEMS.countAchievement = {
        ...objBase,
    };

    COLUMNS.countAchievement = {

        width: 70,
        statistics: { listIndex: 'list_achievement', targetIdKey: 'memberId' }
    };
    F_ITEMS.countAchievement = { ...objBase, type: "input" };
}

//#endregion


//#region 微信昵称
{
    let objBase = {
        label: "微信昵称",
        prop: "wxNickName",
    }
    D_ITEMS.wxNickName = {
        ...objBase,
    };
    COLUMNS.wxNickName = {
        ...objBase,
        width: 100
    };

    F_ITEMS.wxNickName = { ...objBase, type: "input" };
}

//#endregion





//#region 对阵分组/成绩
{
    let objBase = {
        label: "对阵分组/成绩",
    }
    D_ITEMS.confrontAchievement = {
        ...objBase,
    };
    COLUMNS.confrontAchievement = {
        ...objBase,
        width: 105,
        slot: "slot_column_achievement"
    };
    F_ITEMS.confrontAchievement = { ...objBase, type: "input" };
}



//#region 报名表
{
    let objBase = {
        label: "报名表",
    }
    D_ITEMS.enroolSheet = {
        ...objBase,
    };
    COLUMNS.enroolSheet = {
        ...objBase,
        requireProp: ["registeredPersons"],
        width: 95,
        slot: "slot_column_enroll"
    };

    F_ITEMS.enroolSheet = { ...objBase, type: "input" };
}


//#region 参赛人
{
    let objBase = {
        label: "参赛人",
        prop: "participantsId",
    }
    D_ITEMS.participantsId = { ...objBase, slot: "slot_detail_item_participantsId" };
    COLUMNS.participantsId = {
        ...objBase,
        width: 120,
        formatter: function (rowData) {
            return lodash.get(rowData, "memberDoc.name", "") + `(${rowData.participantsId})`
        }
    };


    F_ITEMS.participantsId = {
        ...objBase,
        type: "select",
        ajax: {
            url: "/crossList?page=tangball_member",
            keyLabel: "name",
            keyValue: "P1"
        }
    };

    F_ITEMS.participantsId_search = {
        ...objBase,
        label: "参赛人Id",
    }
}


//#region 比赛开始时间
{
    let objBase = {
        label: "比赛开始时间",
        prop: "timeStart",
    }
    D_ITEMS.timeStart = {
        ...objBase,
    };
    COLUMNS.timeStart = {
        ...objBase,
        width: 155,
        formatter: function (row) {
            return moment(row.timeStart).format("YYYY-MM-DD HH:mm");
        }
    };
    F_ITEMS.timeStart = { ...objBase, type: "dateTime" };
}


//#region 结束时间
{
    let objBase = {
        label: "结束时间",
        prop: "timeEnd",
    }
    D_ITEMS.timeEnd = {
        ...objBase,
    };
    COLUMNS.timeEnd = {
        ...objBase,
        width: 175,
        formatter: function (row) {
            return moment(row.timeEnd).format("YYYY-MM-DD HH:mm");
        }
    };
    F_ITEMS.timeEnd = { ...objBase, type: "dateTime" };
}


//#region 轮数
{
    let objBase = {
        label: "轮数",
        prop: "roundNum",
    }
    D_ITEMS.roundNum = {
        ...objBase,
    };
    COLUMNS.roundNum = {
        ...objBase,
        width: 75
    };
    F_ITEMS.roundNum = { ...objBase, type: "input" };
}


//#region 组数
{
    let objBase = {
        label: "组数",
        prop: "groupNum",
    }
    D_ITEMS.groupNum = {
        ...objBase,
    };
    COLUMNS.groupNum = {
        ...objBase,
        width: 75
    };
    F_ITEMS.groupNum = { ...objBase, type: "number" };
}


//#region 杆数
{
    let objBase = {
        label: "杆数",
        prop: "matchScore",
    }
    D_ITEMS.matchScore = {
        ...objBase,
        slot: 'slot_detail_item_scoreList'
    };
    COLUMNS.matchScore = {
        ...objBase,
        requireProp: ["scoreList"], //依赖成绩列表
        "min-width": 90
    };
    COLUMNS.matchScore2 = {
        ...objBase,
        width: 90
    };
    COLUMNS.matchScoreTotal = {
        ...objBase,
        label: "总杆数",
        width: 100,
    };
    F_ITEMS.matchScore = { ...objBase, type: "input" };
    F_ITEMS.matchScoreTotal = { ...objBase, label: "总杆数", type: "input" };
}


//#region 所属球队
{
    let objBase = {
        label: "所属球队",
        prop: "teamId",
    }
    D_ITEMS.teamId = {
        ...objBase,
    };
    COLUMNS.teamId = {
        ...objBase,
        width: 120,
        formatter: function (rowData) {
            if (rowData.team) {
                return rowData.team.name ? rowData.team.name : '无'
            }
        }
    };
    F_ITEMS.teamId = {
        label: "所属球队",
        prop: "teamId",
        type: "select",
        ajax: {
            // param: { aaa: 123 },
            url: "/crossList?page=tangball_team",
            keyLabel: "name",
            keyValue: "P1"
        }
    };


}


//#region 打位
{
    let objBase = {
        label: "打位",
        prop: "tee",
    }
    D_ITEMS.tee = {
        ...objBase,
    };
    COLUMNS.tee = { ...objBase, width: 75, };
    F_ITEMS.tee = {
        ...objBase,
        type: "number"
    };
}


//#region 成绩记分
{
    let objBase = {
        label: "成绩记分",
        prop: "scoreList",
    }
    D_ITEMS.scoreList = {
        ...objBase,
    };
    COLUMNS.scoreList = { ...objBase, width: 70, };
    F_ITEMS.scoreList = {
        ...objBase,
        type: "input",
        slot: 'slot_form_item_scoreList',
        col_span: 24
    };
}


//#region 赛段
{
    let objBase = {
        label: "赛段",
        prop: "progressIndex",
    }
    D_ITEMS.progressIndex = {
        ...objBase,
    };
    COLUMNS.progressIndex = {
        ...objBase,
        width: 75
    };
    F_ITEMS.progressIndex = { ...objBase, type: "input" };
}


//#region 名次
{
    let objBase = {
        label: "名次",
        prop: "ranking",
    }
    D_ITEMS.ranking = {
        ...objBase,
    };
    COLUMNS.ranking = {
        label: "名次",
        prop: "ranking",
        width: 70
    };
    F_ITEMS.ranking = { ...objBase, type: "input" };
}
//#endregion


//#region 所属角色-之前版本
{
    let objBase = {
        label: "所属角色",
        prop: "role",
    }
    D_ITEMS.role_normal = {
        ...objBase,
    };
    COLUMNS.role_normal = { ...objBase, width: 70, };
    F_ITEMS.role_normal = {
        ...objBase,
        type: "select",
        ajax: {
            url: "/crossList?page=tangball_role",
            keyLabel: "name",
            keyValue: "P1"
        }
    };
}


//#region 赛事收入
{
    let objBase = {
        label: "赛事收入",
        prop: "matchIncome",
    }
    D_ITEMS.matchIncome = {
        ...objBase,
    };
    COLUMNS.matchIncome = { ...objBase, width: 75, slot: "slot_column_matchIncome" };
    F_ITEMS.matchIncome = { ...objBase, type: "input" };
}


//#region 订单金额
{
    let objBase = {
        label: "订单金额",
        prop: "orderMoney",
    }
    D_ITEMS.orderMoney = {
        ...objBase,
    };
    COLUMNS.orderMoney = { ...objBase, width: 70, };
    F_ITEMS.orderMoney = { ...objBase, type: "input" };
}
//#endregion


//#region 球场所在城市
{
    let objBase = {
        label: "城市",
        prop: "venue_city",
    }
    D_ITEMS.venue_city = {
        ...objBase,
    };

    COLUMNS.venue_city = {
        label: "城市",
        prop: "area",
        width: 70,
        formatter: function (rowData) {
            return lodash.get(rowData, `areaDoc.P2`);

        }
    };
}


//#region 可多次报名
{
    let objBase = {
        label: "可多次报名",
        prop: "mutiEnrool",
    }
    D_ITEMS.mutiEnrool = {
        ...objBase,
        formatter: function (row) { return lodash.get(DYDICT.boolean, `${row.mutiEnrool}.label`); },
    };
    COLUMNS.mutiEnrool = {
        ...objBase, width: 70,
        formatter: function (row) { return lodash.get(DYDICT.boolean, `${row.mutiEnrool}.label`); },
    };
    F_ITEMS.mutiEnrool = { ...objBase, type: "select", default: 0, options: DYDICT.arr_boolean };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}
//#endregion


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}
//#endregion


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}
//#endregion


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}
//#endregion


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}
//#endregion


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}
//#endregion


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}


//#region 0000
{
    let objBase = {
        label: "0000",
        prop: "aaaa",
    }
    D_ITEMS.aaaa = {
        ...objBase,
    };
    COLUMNS.aaaa = { ...objBase, width: 70, };
    F_ITEMS.aaaa = { ...objBase, type: "input" };
}
//#endregion
//#endregion













util.oldCFListToNew = function(cfList) {
  let map = {
    detailItems: "D_ITEMS",
    columns: "COLUMNS",
    searchFormItems: "F_ITEMS",
    formItems: "F_ITEMS"
  };
  let objResult = {};
  let arrNeed = Object.keys(map);
  arrNeed.forEach(prop => {
    //循环：{需要处理的字段名数组}
    let keyPub = map[prop];
    if (!keyPub) return;

    let objTarget = window[map[prop]];
    let arrOld = cfList[prop];
    if (!arrOld) return;

    let arr2 = arrOld.map(item => {
      let keyMatch = "xxxxxxxxxxxxxxxxxxxxxxx";

      for (let key in objTarget) {
        if (objTarget[key] === item) {
          //如果{000}000
          keyMatch = key;
        }
      }

      return keyMatch;
    });
    objResult[prop] = arr2;
  });
  return objResult;
};

let T;


export default {
  components: {},
  data() {
    return {
      codeSrc: ` 
  columns: [COLUMNS.title_fixed],
`,
      codeResult: ""
    };
  },
  methods: {
    transform() {
       try {
          if (!T.codeSrc) return;
        T.codeResult = "";
      let obj;
      eval(` obj ={${T.codeSrc}}`);
      console.log("obj:", obj);
      let objRS = util.oldCFListToNew(obj);

      let str2 = "";

      let mapRemark = {
        detailItems: "//-------详情字段数组-------",
        columns: "//-------列配置数组-------",
        searchFormItems: "//-------筛选表单字段数组-------",
        formItems: "//-------新增、修改表单字段数组-------"
      };

      //for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助

      console.log("Object.keys结果", Object.keys(objRS));
      for (let key of Object.keys(objRS)) {
        console.log(key + ": " + objRS[key]);
        let arrIn = objRS[key];
        console.log("arrIn:", arrIn);
        arrIn = arrIn.map(item => `"${item}"`); //带上引号

        str2 += `${mapRemark[key]}\n`;

        str2 += `${key}:[${arrIn.join()}],\n`;
      }
      str2 += `\nutil.reformCFListItem(PUB.listCF.aaaaaaaaa)`;

      T.codeResult = str2;
      } catch (err) {
        this.$message.error(`${err.toString}`);
        console.log(`${err.toString}`);
      }

    
    }
  },
  beforeCreate() {
    T = this;
  },
  created() {},
  async mounted() {}
};
</script>

<style>
</style>
