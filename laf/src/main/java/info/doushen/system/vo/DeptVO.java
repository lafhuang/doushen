package info.doushen.system.vo;

import info.doushen.common.vo.BaseVO;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DeptVO
 *
 * @author huangdou
 * @date 2019/7/4
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class DeptVO extends BaseVO {

    /** 部门名称 */
    private String deptName;
    /** 上级部门 */
    /** 一级部门为0 */
    private int parentId;
    /** 上级部门名称 */
    private String parentName;
    /** 排序 */
    private int sort;

}
