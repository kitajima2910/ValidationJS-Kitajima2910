/**
 * 
 * ██╗  ██╗██╗████████╗ █████╗      ██╗██╗███╗   ███╗ █████╗ ██████╗  █████╗  ██╗ ██████╗ 
 * ██║ ██╔╝██║╚══██╔══╝██╔══██╗     ██║██║████╗ ████║██╔══██╗╚════██╗██╔══██╗███║██╔═████╗
 * █████╔╝ ██║   ██║   ███████║     ██║██║██╔████╔██║███████║ █████╔╝╚██████║╚██║██║██╔██║
 * ██╔═██╗ ██║   ██║   ██╔══██║██   ██║██║██║╚██╔╝██║██╔══██║██╔═══╝  ╚═══██║ ██║████╔╝██║
 * ██║  ██╗██║   ██║   ██║  ██║╚█████╔╝██║██║ ╚═╝ ██║██║  ██║███████╗ █████╔╝ ██║╚██████╔╝
 * ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚════╝ ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚════╝  ╚═╝ ╚═════╝                              
 * 
 * Author: kitajima2910@gmail.com
 * Version: 1.0.1
 * Date: 2019-10-24
 * Update: 2019-10-29
 * [Validation of HTML5 - JAVASCRIPT]
 */

/* PATTERN 
function validation() {
    let flag = true;

    if (!checkNotBlank(txtName, 'KITAJIMA', 'red', 'blue')) {
        flag = false;
    }

    return flag;
}

document.querySelector('[type="submit"]').addEventListener('click', (e) => {

    if (validation()) {
        
    }

})

FIXCODE với nút button reset type="date": txtDate.defaultValue = getFormatCurrentDate();

*/


/** Chuỗi rỗng */
const BLANK = '';
/** Chuỗi lỗi */
const ERROR = 'Error...! -_-';

/**
 * TODO: Lấy id của selector cần DOM
 * 
 * @param {id} ID Của selector
 * @returns Object
 * @author Kitajima2910
 */
function domID(id) {
    return document.getElementById(id);
}

/**
 * TODO: Lấy chuỗi cần DOM, ví dụ: [type="radio"], [type="checkbox"], ...
 * 
 * @param {str} str Ví dụ: [type="radio"], [type="checkbox"], ...
 * @returns Object
 * @author Kitajima2910
 */
function domSelectorAll(str) {
    return document.querySelectorAll(str);
}

/**
 * TODO: Định dạng yyyy-MM-dd
 * 
 * @returns String
 * @author Kitajima2910
 */
function getFormatCurrentDate() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
}

/**
 * TODO: Lấy các giá trị TRUE của checkbox/radio
 * 
 * @param  {...ArrCKRD} ArrCKRD Checkbox hoặc radio 
 * @returns Array
 * @author Kitajima2910
 */
function getCheckboxAndRadio(...arrCKRD) {
    let tmpArrCKRD = [];
    arrCKRD[0].forEach(e => {
        if (e.checked) {
            tmpArrCKRD.push(e.value);
        }
    });
    return tmpArrCKRD;
}

/**
 * TODO: kiểm tra xem input, select(option đầu tiên phải BLANK), textarea
 * 
 * @param {field} field Trường cần kiểm tra
 * @param {content} content Nội dung cần hiển thị khi lỗi
 * @param  {...borderColor} borderColor Màu sắc hiển thị khi kiểm tra sai/đúng cho border 
 * @returns Boolean
 * @author Kitajima2910
 */
function checkNotBlank(field, content, ...borderColor) {
    if (field.value.trim().length === 0) {
        if (borderColor.length !== 0) {
            field.style.borderColor = borderColor[0];
        }
        field.setCustomValidity(content);
        return false;
    } else {
        if (borderColor.length !== 0) {
            field.style.borderColor = borderColor[1];
        }
        field.setCustomValidity(BLANK);
        return true;
    }
}

/**
 * TODO: kiểm tra các regex
 * 
 * @param {field} field Trường cần kiểm tra
 * @param {regex} regex Biểu thức chính quy
 * @param {content} content Nội dung cần hiển thị khi lỗi
 * @param  {...borderColor} borderColor Màu sắc hiển thị khi kiểm tra sai/đúng cho border 
 * @returns Boolean
 * @author Kitajima2910
 */
function checkRegex(field, regex, content, ...borderColor) {
    if (regex.test(field.value.trim())) {
        if (borderColor.length !== 0) {
            field.style.borderColor = borderColor[0];
        }
        field.setCustomValidity(BLANK);
        return true;
    } else {
        if (borderColor.length !== 0) {
            field.style.borderColor = borderColor[1];
        }
        field.setCustomValidity(content);
        return false;
    }
}

/**
 * TODO: Kiểm tra độ tuổi
 * 
 * @param {field} field type="date" <== giá trị date
 * @param {number} number Số tuổi chỉ định ví dụ: < 18 bạn chưa đủ 18 tuổi
 * @param {content} content Nội dung cần hiển thị khi lỗi
 * @param  {...borderColor} borderColor Màu sắc hiển thị khi kiểm tra sai/đúng cho border 
 * @returns Boolean
 * @author Kitajima2910
 */
function checkAge(field, number, content, ...borderColor) {
    let currentYear = new Date().getFullYear();
    let arrDate = field.value.split('-');

    if (currentYear - +arrDate[0] < number) {
        if (borderColor.length !== 0) {
            field.style.borderColor = borderColor[0];
        }
        field.setCustomValidity(content);
        return false;
    } else {
        if (borderColor.length !== 0) {
            field.style.borderColor = borderColor[1];
        }
        field.setCustomValidity(BLANK);
        return true;
    }
}

/**
 * TODO: Hiển thị danh sách dạng cơ bản
 * 
 * @param {titles} titles Mảng các title
 * @param {values} values Mảng các giá trị
 * @author Kitajima2910
 * @returns String
 */
function getInfoBasic(titles, values) {
    let arrInfo = [];
    if (titles.length === values.length) {
        for (let i = 0; i < titles.length; i++) {
            arrInfo.push(`${titles[i]}: ${values[i]}`);
        }
    } else {
        console.error(ERROR);
        return;
    }
    return arrInfo.join('\n');
}

/**
 * TODO: IST chừa hàm checkRealtimeIST và hàm checkIST
 * 
 * ? Sử dụng checkRealtimeIST và checkIST cùng 1 lúc và cùng MSG sẽ hiệu quả
 * ? Sử dụng checkRealtimePassCfm và checkPassCfm cùng 1 lúc và cùng MSG sẽ hiệu quả
 */
class IST {

    /**
     * TODO: kiểm tra realtime input, select(option đầu tiên phải BLANK), textarea
     * 
     * @param {field} field Input, Select, textarea
     * @param {typeEvent} typeEvent Loại event
     * @param {content} content Nội dung thông báo lỗi
     * @param {regex} regex Biểu thức chính quy
     * @param {contentRegex} contentRegex Nội dụng lỗi khi sử dụng regex
     * @param {...borderColor} borderColor Màu sắc hiển thị khi kiểm tra sai/đúng cho border
     * @returns Void
     * @author kitajima2910
     */
    static checkRealtimeIST = (field, typeEvent, content, regex, contentRegex, ...borderColor) => {
        field.addEventListener(typeEvent, () => {
            if (field.value.trim() === '') {
                if (borderColor.length !== 0) {
                    field.style.borderColor = borderColor[0];
                }
                field.setCustomValidity(content);
            } else {
                if (regex === '') {
                    regex = null;
                }
                if (regex !== null) {
                    if (regex.test(field.value)) {
                        if (borderColor.length !== 0) {
                            field.style.borderColor = borderColor[1];
                        }
                        field.setCustomValidity(BLANK);
                    } else {
                        if (borderColor.length !== 0) {
                            field.style.borderColor = borderColor[0];
                        }
                        field.setCustomValidity(contentRegex);
                    }
                } else {
                    if (borderColor.length !== 0) {
                        field.style.borderColor = borderColor[1];
                    }
                    field.setCustomValidity(BLANK);
                }
            }
        });
    }

    /**
     * TODO: kiểm tra input, select, textarea
     * 
     * @param {field} field Input, Select(option đầu tiên phải BLANK), textarea
     * @param {content} content Nội dung thông báo lỗi
     * @param {regex} regex Biểu thức chính quy
     * @param {contentRegex} contentRegex Nội dụng lỗi khi sử dụng regex
     * @param {...borderColor} borderColor Màu sắc hiển thị khi kiểm tra sai/đúng cho border
     * @returns Boolean
     * @author kitajima2910
     */
    static checkIST = (field, content, regex, contentRegex, ...borderColor) => {
        if (field.value.trim() === '') {
            if (borderColor.length !== 0) {
                field.style.borderColor = borderColor[0];
            }
            field.setCustomValidity(content);
            return false;
        } else {
            if (regex === '') {
                regex = null;
            }
            if (regex !== null) {
                if (regex.test(field.value)) {
                    if (borderColor.length !== 0) {
                        field.style.borderColor = borderColor[1];
                    }
                    field.setCustomValidity(BLANK);
                    return true;
                } else {
                    if (borderColor.length !== 0) {
                        field.style.borderColor = borderColor[0];
                    }
                    field.setCustomValidity(contentRegex);
                    return false;
                }
            } else {
                if (borderColor.length !== 0) {
                    field.style.borderColor = borderColor[1];
                }
                field.setCustomValidity(BLANK);
                return true;
            }
        }
    }

    /**
     * TODO: Kiểm tra realtime password confirm
     * 
     * @param {passCfm} passCfm Mật khẩu nhập lại
     * @param {pass} pass Mật khẩu để confirm
     * @param {content} content Nội dung báo lỗi
     * @param {...borderColor} borderColor Màu sắc hiển thị khi kiểm tra sai/đúng cho border
     * @returns Void
     * @author Kitajima2910
     */
    static checkRealtimePassCfm = (passCfm, pass, content, ...borderColor) => {
        passCfm.addEventListener('input', () => {
            if (passCfm.value.length === 0) {
                if (borderColor.length !== 0) {
                    passCfm.style.borderColor = borderColor[0];
                }
                return false;
            } else {
                if (passCfm.value === pass.value) {
                    if (borderColor.length !== 0) {
                        passCfm.style.borderColor = borderColor[1];
                    }
                    passCfm.setCustomValidity(BLANK);
                } else {
                    if (borderColor.length !== 0) {
                        passCfm.style.borderColor = borderColor[0];
                    }
                    passCfm.setCustomValidity(content);
                }
            }
        });
    }

    /**
     * TODO: Kiểm tra password confirm
     * 
     * @param {passCfm} passCfm Mật khẩu nhập lại
     * @param {pass} pass Mật khẩu để confirm
     * @param {content} content Nội dung báo lỗi
     * @param {...borderColor} borderColor Màu sắc hiển thị khi kiểm tra sai/đúng cho border
     * @returns Void
     * @author Kitajima2910
     */
    static checkPassCfm = (passCfm, pass, content, ...borderColor) => {
        if (passCfm.value.length === 0) {
            if (borderColor.length !== 0) {
                passCfm.style.borderColor = borderColor[0];
            }
            return false;
        } else {
            if (passCfm.value === pass.value) {
                if (borderColor.length !== 0) {
                    passCfm.style.borderColor = borderColor[1];
                }
                passCfm.setCustomValidity(BLANK);
                return true;
            } else {
                if (borderColor.length !== 0) {
                    passCfm.style.borderColor = borderColor[0];
                }
                passCfm.setCustomValidity(content);
                return false;
            }
        }
    }

}
