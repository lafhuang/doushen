package info.doushen.common.utils;

import java.io.Serializable;
import java.util.List;

/**
 * Pager
 *
 * @author huangdou
 * @date 2018/12/5
 */
public class Pager implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 记录数 */
    private long total;
    /** 集合 */
    private List<?> rows;

    public Pager(long total, List<?> rows) {
        this.total = total;
        this.rows = rows;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List<?> getRows() {
        return rows;
    }

    public void setRows(List<?> rows) {
        this.rows = rows;
    }

}
