/**
 * ██╗  ██╗██╗████████╗ █████╗      ██╗██╗███╗   ███╗ █████╗ 
 * ██║ ██╔╝██║╚══██╔══╝██╔══██╗     ██║██║████╗ ████║██╔══██╗
 * █████╔╝ ██║   ██║   ███████║     ██║██║██╔████╔██║███████║
 * ██╔═██╗ ██║   ██║   ██╔══██║██   ██║██║██║╚██╔╝██║██╔══██║
 * ██║  ██╗██║   ██║   ██║  ██║╚█████╔╝██║██║ ╚═╝ ██║██║  ██║
 * ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚════╝ ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝
 * Author: kitajima2910@gmail.com
 * Version: 1.0.0
 * Date: 2019-10-24
 * [Validation of HTML5 - JAVASCRIPT]
 */

/** Pattern is regex commom */
const PATTERN = {
    regexName: /^[a-z\u00C0-\u024F\u1E00-\u1EFF ]{5,30}$/i,
    regexFullName: /^[a-z\u00C0-\u024F\u1E00-\u1EFF ]{5,30}$/i,
    regexAddress: /^[a-z\u00C0-\u024F\u1E00-\u1EFF ]{5,30}$/i,
    regexEmail: /^([a-z\d]{5,15})@([a-z\d]{2,10})\.([a-z]{2,5})(\.[a-z]{2})?$/i,
    regexPhone: /^[\d]{10}$/,
    regexComment: /^[\d\s\w\.\@\u00C0-\u024F\u1E00-\u1EFF]{1,200}$/,
    regexPass: /^[\d\s\w\.\@\u00C0-\u024F\u1E00-\u1EFF]{6,30}$/
};

/** Const string */
const CHECK_IS_BLANK = 'Bạn không được để trống -_-';
const CHECK_NAME = 'Tên của bạn nhập không hợp lệ -_-';
const CHECK_FULL_NAME = 'Tên đầy đủ của bạn nhập không hợp lệ -_-';
const CHECK_EMAIL = 'Email của bạn nhập không hợp lệ -_-';
const CHECK_ADDRESS = 'Địa chỉ của bạn nhập không hợp lệ -_-';
const CHECK_PHONE = 'Số điện thoại của bạn nhập không hợp lệ -_-';
const CHECK_COMMENT = 'Bình luận của bạn nhập không hợp lệ -_-';
const CHECK_PASS = 'Mật khẩu của bạn nhập không bảo mật tốt -_-';
const CHECK_PASS_CFM = 'Mật khẩu nhập lại của bạn không trùng khớp -_-';
const CHECK_SELECT = 'Bạn không được để mặc định, hãy lựa chọn -_-';

/**
 * Get element by ID
 * 
 * @param id ID
 */
function DomID(id) {
    return document.getElementById(id);
}

// DomID with input normal
var txtName = DomID('txtName');
var txtFullName = DomID('txtFullName');
var txtAddress = DomID('txtAddress');
var txtEmail = DomID('txtEmail');
var txtPhone = DomID('txtPhone');
var txtComment = DomID('txtComment');
var txtPass = DomID('txtPass');
var txtPassCfm = DomID('txtPassCfm');

// DomID select
var cbCommon = DomID('cbCommon');

// DomID input date
var txtDate = DomID('txtDate');

// DomID checkbox, radio
var ckCommons = document.querySelectorAll('[type="checkbox"]');
var rdCommons = document.querySelectorAll('[type="radio"]');


/**
 * Get current date
 */
function getDate() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
}

txtDate.defaultValue = getDate();

/**
 * Get checkbox
 * 
 * @param checkboxs Array checkbox 
 */
function getCheckBox(...checkboxs) {
    let arrCheckboxs = [];
    checkboxs[0].forEach(e => {
        if (e.checked) {
            arrCheckboxs.push(e.value);
        }
    });
    return arrCheckboxs;
}

/**
 * Get radio
 * 
 * @param radio Arr Radio 
 */
function getRadio(...radios) {
    let tmpRd = '';
    radios[0].forEach(e => {
        if (e.checked) {
            tmpRd = e.value;
        }
    });
    return tmpRd;
}

/**
 * Check date
 * 
 * @param date Date 
 */
function checkDate(date) {
    let currentYear = new Date().getFullYear();
    let arrDate = date.value.split('-');
    return currentYear - +arrDate[0];
}

/**
 * Realtime check
 * 
 * @param field Field 
 * @param typeEvent Type event (input, keyup,...) 
 * @param regex Regex
 * @param content MSG
 */
function checkRealtime(field, typeEvent, regex, content) {
    if (field) {
        field.addEventListener(typeEvent, () => {
            if (field.value.trim().length === 0) {
                field.style.border = '2px solid red';
                field.setCustomValidity(CHECK_IS_BLANK);
            } else {
                if (regex.test(field.value.trim())) {
                    field.style.border = '2px solid blue';
                    field.setCustomValidity('');
                } else {
                    field.style.border = '2px solid red';
                    field.setCustomValidity(content);
                }
            }
        });
    }
}

/**
 * Realtime combobox
 * 
 * @param field Combobox 
 */
function checkRealtimeCombobox(field, typeEvent) {
    if (field) {
        field.addEventListener(typeEvent, () => {
            if (field.value === '') {
                field.style.border = '2px solid red';
                field.setCustomValidity(CHECK_SELECT);
            } else {
                field.style.border = '2px solid blue';
                field.setCustomValidity('');
            }
        });
    }
}

/**
 * Realtime PassCfm
 * 
 * @param field Field
 * @param content Content 
 * @param fields Field [0, 1, ...]
 */
function checkRealtimePassCfm(field, typeEvent, content, ...fields) {
    if (field) {
        field.addEventListener(typeEvent, () => {
            if (field.value.length === 0) {
                field.style.border = '2px solid red';
                field.setCustomValidity(CHECK_IS_BLANK);
            } else {
                if (field.value === fields[0].value) {
                    field.style.border = '2px solid blue';
                    field.setCustomValidity('');
                } else {
                    field.style.border = '2px solid red';
                    field.setCustomValidity(content);
                }
            }
        });
    }
}

// Check style input
checkRealtime(DomID('txtName'), 'input', PATTERN.regexName, CHECK_NAME);
checkRealtime(DomID('txtFullName'), 'input', PATTERN.regexFullName, CHECK_FULL_NAME);
checkRealtime(DomID('txtAddress'), 'input', PATTERN.regexAddress, CHECK_ADDRESS);
checkRealtime(DomID('txtEmail'), 'input', PATTERN.regexEmail, CHECK_EMAIL);
checkRealtime(DomID('txtPhone'), 'input', PATTERN.regexPhone, CHECK_PHONE);
checkRealtime(DomID('txtComment'), 'input', PATTERN.regexComment, CHECK_COMMENT);
checkRealtime(DomID('txtPass'), 'input', PATTERN.regexPass, CHECK_PASS);
checkRealtimePassCfm(DomID('txtPassCfm'), 'input', CHECK_PASS_CFM, txtPass);
checkRealtimeCombobox(DomID('cbCommon'), 'change');

/**
 * Check Regex (input, select)
 * 
 * @param field Filed 
 * @param regex Regex
 * @param content Content
 */
function checkRegex(field, regex, content) {
    if (field) {
        if (field.value.trim().length === 0) {
            field.setCustomValidity(CHECK_IS_BLANK);
            return false;
        } else {
            if (regex.test(field.value.trim())) {
                field.setCustomValidity('');
                return true;
            } else {
                field.setCustomValidity(content);
                return false;
            }
        }
    }
}

/**
 * Check combobox
 * 
 * @param field Combobox 
 */
function checkCombobox(field) {
    if (field) {
        if (field.value === '') {
            field.setCustomValidity(CHECK_SELECT);
            return false;
        } else {
            field.setCustomValidity('');
            return true;
        }
    }
}

/**
 * Check combobox
 * 
 * @param field Combobox 
 */
function checkDateAge(field, ageNumber) {
    if (field) {
        if (checkDate(field) < ageNumber) {
            field.setCustomValidity('Bạn chưa đủ 18 tuổi -_-');
            return false;
        } else {
            field.setCustomValidity('');
            return true;
        }
    }
}

/**
 * Check PassCfm
 * 
 * @param field Field
 * @param content Content
 * @param fields Fields[0, 1, 2, ...]
 */
function checkPassCfm(field, content, ...fields) {
    if (field) {
        if (field.value.length === 0) {
            field.setCustomValidity(CHECK_IS_BLANK);
            return false;
        } else {
            if (field.value === fields[0].value) {
                field.setCustomValidity('');
                return true;
            } else {
                field.setCustomValidity(content);
                return false;
            }
        }
    }
}

/**
 * Check validation for form (input, select)
 */
function validation() {
    // flag is true    
    let flag = true;

    if (txtName !== null) {
        if (!checkRegex(txtName, PATTERN.regexName, CHECK_NAME)) {
            flag = false;
        }
    }
    if (txtFullName !== null) {
        if (!checkRegex(txtFullName, PATTERN.regexFullName, CHECK_FULL_NAME)) {
            flag = false;
        }
    }
    if (txtAddress !== null) {
        if (!checkRegex(txtAddress, PATTERN.regexAddress, CHECK_ADDRESS)) {
            flag = false;
        }
    }
    if (txtEmail !== null) {
        if (!checkRegex(txtEmail, PATTERN.regexEmail, CHECK_EMAIL)) {
            flag = false;
        }
    }
    if (txtPhone !== null) {
        if (!checkRegex(txtPhone, PATTERN.regexPhone, CHECK_PHONE)) {
            flag = false;
        }
    }
    if (txtComment !== null) {
        if (!checkRegex(txtComment, PATTERN.regexComment, CHECK_COMMENT)) {
            flag = false;
        }
    }
    if (txtPass !== null) {
        if (!checkRegex(txtPass, PATTERN.regexPass, CHECK_PASS)) {
            flag = false;
        }
    }
    if (txtPassCfm !== null) {
        if (!checkPassCfm(txtPassCfm, CHECK_PASS_CFM, txtPass)) {
            flag = false;
        }
    }
    if (cbCommon !== null) {
        if (!checkCombobox(cbCommon)) {
            flag = false;
        }
    }
    if (txtDate !== null) {
        if (!checkDateAge(txtDate, 17)) {
            flag = false;
        }
    }

    return flag;
}

// Check button type submit
document.querySelector('[type="submit"]').addEventListener('click', (e) => {

    if (validation()) {
        let arr = [];
        arr.push('====== THÔNG TIN ======');
        // arr.push('Date: ' + txtDate.value);
        arr.push('=======================')
        alert(arr.join('\n'));
        e.preventDefault();
    }

});

/**
 * Default filed
 * 
 * @param fields Array field
 * @param tag [input, seclet, ...] 
 */
function defaultField(fields, tag) {
    if (tag === 'input') {
        fields.forEach(field => {
            // field.style.borderWidth = '2px';
            // field.style.borderStyle = 'inset';
            // field.style.borderColor = 'initial';
        });
    }
    if (tag === 'select') {
        fields.forEach(field => {
            // field.style.borderWidth = '1px';
            // field.style.borderStyle = 'solid';
            // field.style.borderColor = 'rgb(169, 169, 169)';
        });
    }
}


document.querySelector('[type="reset"]').addEventListener('click', (e) => {
    // let inputs = document.querySelectorAll('input');
    // let selects = document.querySelectorAll('select');
    txtDate.defaultValue = getDate();
    // defaultField(inputs, 'input');
    // defaultField(selects, 'select');
})
