package info.doushen.system.entity;

import info.doushen.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DictEntity
 *
 * @author huangdou
 * @date 2018/12/12
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class DictEntity extends BaseEntity {

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
