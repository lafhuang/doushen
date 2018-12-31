package info.doushen.common.utils;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Query
 *
 * @author huangdou
 * @date 2018/12/5
 */
public class Query extends LinkedHashMap<String, Object> {

    private static final long serialVersionUID = 1L;

    private int offset;
    private int limit;

    public Query(Map<String, Object> params) {
        this.putAll(params);

        if (null == params.get("offset")) {
            this.offset = 0;
        } else {
            this.offset = Integer.parseInt(params.get("offset").toString());
        }

        if (null == params.get("limit")) {
            this.limit = 10;
        } else {
            this.limit = Integer.parseInt(params.get("limit").toString());
        }

        this.put("offset", offset);
        this.put("page", offset / limit + 1);
        this.put("limit", limit);
    }

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

}
