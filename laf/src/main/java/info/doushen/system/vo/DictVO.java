package info.doushen.system.vo;

import info.doushen.common.vo.BaseVO;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DictVO
 *
 * @author huangdou
 * @date 2018/12/12
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class DictVO extends BaseVO {

    /** 数据字典名 */
    private String dictName;
    /** 数据字典值 */
    private String dictValue;
    /** 数据字典类型 */
    private String dictType;
    /** 数据字典描述 */
    private String description;
    /** 排序 */
    private int sort;

}
